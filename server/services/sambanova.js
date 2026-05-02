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

export async function generateChatReply(messages) {
  if (!env.sambaApiKey) {
    const error = new Error("SAMBANOVA_API_KEY is not configured in .env.");
    error.statusCode = 503;
    throw error;
  }

  const response = await fetch(`${env.sambaApiBaseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.sambaApiKey}`,
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
