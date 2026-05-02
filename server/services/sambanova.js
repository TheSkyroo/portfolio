import { env } from "../config.js";

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
      temperature: 0.7,
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

  return content;
}
