import fs from "node:fs";
import path from "node:path";
import express from "express";
import { env } from "./config.js";
import { connectToDatabase } from "./db.js";
import { ChatSession } from "./models/ChatSession.js";
import { systemPrompt } from "./prompts/ishantPrompt.js";
import { generateChatReply } from "./services/sambanova.js";

const app = express();
const distDir = path.join(env.rootDir, "dist");

app.use(express.json({ limit: "1mb" }));

function asyncHandler(handler) {
  return (request, response, next) => {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
}

function normalizeMessages(messages) {
  return messages.map((message) => ({
    id: message._id.toString(),
    role: message.role,
    content: message.content,
  }));
}

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    mongoConfigured: Boolean(env.mongoUri),
    sambaConfigured: Boolean(env.sambaApiKey),
    model: env.sambaModel,
  });
});

app.get(
  "/api/chat/:sessionId",
  asyncHandler(async (request, response) => {
    const sessionId = request.params.sessionId?.trim();
    if (!sessionId) {
      response.status(400).json({ error: "A valid sessionId is required." });
      return;
    }

    await connectToDatabase();
    const session = await ChatSession.findOne({ sessionId }).lean();

    response.json({
      sessionId,
      messages: session?.messages ? normalizeMessages(session.messages) : [],
    });
  }),
);

app.post(
  "/api/chat",
  asyncHandler(async (request, response) => {
    const sessionId = request.body?.sessionId?.trim();
    const message = request.body?.message?.trim();

    if (!sessionId) {
      response.status(400).json({ error: "A valid sessionId is required." });
      return;
    }

    if (!message) {
      response.status(400).json({ error: "A message is required." });
      return;
    }

    if (message.length > 4000) {
      response.status(400).json({ error: "Message is too long." });
      return;
    }

    await connectToDatabase();

    let session = await ChatSession.findOne({ sessionId });
    if (!session) {
      session = new ChatSession({ sessionId, messages: [] });
    }

    session.messages.push({ role: "user", content: message });
    await session.save();

    const recentMessages = session.messages.slice(-12).map((entry) => ({
      role: entry.role,
      content: entry.content,
    }));

    const reply = await generateChatReply([
      { role: "system", content: systemPrompt },
      ...recentMessages,
    ]);

    session.messages.push({ role: "assistant", content: reply });
    await session.save();

    response.json({
      sessionId,
      reply,
      messages: normalizeMessages(session.messages),
    });
  }),
);

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));

  app.get(/^(?!\/api).*/, (_request, response) => {
    response.sendFile(path.join(distDir, "index.html"));
  });
}

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(error.statusCode || 500).json({
    error: error.message || "Internal server error.",
  });
});

export default app;
