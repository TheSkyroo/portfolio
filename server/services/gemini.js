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

// Convert our OpenAI-style message list into Gemini's request shape.
// System messages become `system_instruction`; assistant → "model".
function toGeminiRequest(messages) {
  const systemParts = [];
  const contents = [];

  for (const message of messages) {
    if (message.role === "system") {
      systemParts.push(message.content);
      continue;
    }

    contents.push({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    });
  }

  const body = {
    contents,
    generationConfig: { temperature: 0.4 },
  };

  if (systemParts.length > 0) {
    body.system_instruction = { parts: [{ text: systemParts.join("\n\n") }] };
  }

  return body;
}

let currentKeyIndex = 0;

export async function generateChatReply(messages) {
  const keys = env.geminiApiKeys;

  if (!keys || keys.length === 0) {
    const error = new Error("No Gemini API key is configured in .env.");
    error.statusCode = 503;
    throw error;
  }

  const body = toGeminiRequest(messages);

  for (let attempt = 0; attempt < keys.length; attempt++) {
    const key = keys[currentKeyIndex];

    const response = await fetch(
      `${env.geminiApiBaseUrl}/models/${env.geminiModel}:generateContent?key=${key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      // 429 (rate limit) and 403 (quota) → rotate to the next key if we have one.
      if (response.status === 429 || response.status === 403) {
        currentKeyIndex = (currentKeyIndex + 1) % keys.length;

        if (attempt < keys.length - 1) {
          continue;
        }

        const error = new Error(
          "Sorry, my Wi-Fi is down right now. Can we talk later? Alternatively, you can email me at ishaant69@gmail.com.",
        );
        error.statusCode = 429;
        throw error;
      }

      const error = new Error(
        payload?.error?.message ||
          `Gemini request failed with status ${response.status}.`,
      );
      error.statusCode = response.status;
      throw error;
    }

    const content = payload?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim();

    if (!content) {
      const blockReason =
        payload?.promptFeedback?.blockReason ||
        payload?.candidates?.[0]?.finishReason;
      const error = new Error(
        blockReason
          ? `Gemini returned no content (${blockReason}).`
          : "Gemini returned an empty reply.",
      );
      error.statusCode = 502;
      throw error;
    }

    return wantsDetailedReply(messages) ? content : shortenReply(content);
  }
}
