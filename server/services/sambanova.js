import { env } from "../config.js";

const DETAIL_REQUEST_PATTERN =
  /\b(expand|more detail|more details|detailed|deep dive|go deeper|elaborate|longer|full version|step by step|walk me through)\b/i;

function wantsDetailedReply(messages) {
  const lastUserMessage =
    [...messages].reverse().find((message) => message.role === "user")?.content ?? "";

  return DETAIL_REQUEST_PATTERN.test(lastUserMessage);
}

function shortenReply(content) {
  const normalized = content.replace(/\r\n/g, "\n").trim();
  if (!normalized) {
    return normalized;
  }

  const lines = normalized
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const listLines = lines.filter((line) => /^([-*•]|\d+\.)\s/.test(line));
  if (listLines.length >= 2) {
    return listLines.slice(0, 3).join("\n");
  }

  const flatText = normalized.replace(/\s+/g, " ").trim();
  if (flatText.length <= 320) {
    return flatText;
  }

  const sentences = flatText.match(/[^.!?]+[.!?]?/g) ?? [flatText];
  const kept = [];
  let totalLength = 0;

  for (const sentence of sentences) {
    const next = sentence.trim();
    if (!next) {
      continue;
    }

    const projectedLength = totalLength === 0 ? next.length : totalLength + 1 + next.length;
    if (kept.length > 0 && projectedLength > 320) {
      break;
    }

    kept.push(next);
    totalLength = projectedLength;

    if (kept.length >= 3) {
      break;
    }
  }

  return kept.join(" ") || flatText.slice(0, 320).trimEnd();
}

let currentKeyIndex = 0;

export async function generateChatReply(messages) {
  const keys = env.sambaApiKeys;

  if (!keys || keys.length === 0) {
    const error = new Error("No SambaNova API keys are configured in .env.");
    error.statusCode = 503;
    throw error;
  }

  for (let attempt = 0; attempt < keys.length; attempt++) {
    const key = keys[currentKeyIndex];

    const response = await fetch(`${env.sambaApiBaseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: env.sambaModel,
        temperature: 0.4,
        messages,
      }),
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      if (response.status === 429) {
        // Rotate the index for the next request
        currentKeyIndex = (currentKeyIndex + 1) % keys.length;

        // If we still have more keys to try in this loop, continue
        if (attempt < keys.length - 1) {
          continue;
        }

        // If we've tried ALL keys and all returned 429, throw the custom message
        const error = new Error(
          "Sorry, my Wi-Fi is down right now. Can we talk later? Alternatively, you can email me at ishaant69@gmail.com.",
        );
        error.statusCode = 429;
        throw error;
      }

      const error = new Error(
        payload?.error?.message ||
          payload?.message ||
          `SambaNova request failed with status ${response.status}.`,
      );
      error.statusCode = response.status;
      throw error;
    }

    const content = payload?.choices?.[0]?.message?.content?.trim();
    if (!content) {
      const error = new Error("SambaNova returned an empty reply.");
      error.statusCode = 502;
      throw error;
    }

    return wantsDetailedReply(messages) ? content : shortenReply(content);
  }
}
