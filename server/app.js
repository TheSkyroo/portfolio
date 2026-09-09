import fs from "node:fs";
import path from "node:path";
import express from "express";
import { env } from "./config.js";
import { connectToDatabase } from "./db.js";
import { ChatSession } from "./models/ChatSession.js";
import { systemPrompt } from "./prompts/ishantPrompt.js";
import { generateChatReply } from "./services/gemini.js";

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

// In-memory fallback store, used when MongoDB is unreachable.
// History lives only in server memory and is lost on restart.
const memorySessions = new Map();

function getMemorySession(sessionId) {
  let messages = memorySessions.get(sessionId);
  if (!messages) {
    messages = [];
    memorySessions.set(sessionId, messages);
  }
  return messages;
}

function memorySessionMessages(sessionId, messages) {
  return messages.map((message, index) => ({
    id: `${sessionId}-${index}`,
    role: message.role,
    content: message.content,
  }));
}

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    mongoConfigured: Boolean(env.mongoUri),
    geminiConfigured: env.geminiApiKeys.length > 0,
    model: env.geminiModel,
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

    try {
      await connectToDatabase();
      const session = await ChatSession.findOne({ sessionId }).lean();
      response.json({
        sessionId,
        messages: session?.messages ? normalizeMessages(session.messages) : [],
      });
    } catch (error) {
      console.warn(`[chat] MongoDB unavailable, serving in-memory history: ${error.message}`);
      response.json({
        sessionId,
        messages: memorySessionMessages(sessionId, getMemorySession(sessionId)),
      });
    }
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

    // Record the incoming message. Prefer MongoDB, but fall back to an
    // in-memory store so the chat keeps working when the DB is unreachable.
    let dbSession = null;
    try {
      await connectToDatabase();
      dbSession = await ChatSession.findOne({ sessionId });
      if (!dbSession) {
        dbSession = new ChatSession({ sessionId, messages: [] });
      }
      dbSession.messages.push({ role: "user", content: message });
      await dbSession.save();
    } catch (error) {
      console.warn(`[chat] MongoDB unavailable, continuing without persistence: ${error.message}`);
      dbSession = null;
    }

    const memSession = dbSession ? null : getMemorySession(sessionId);
    if (memSession) {
      memSession.push({ role: "user", content: message });
    }

    const history = dbSession ? dbSession.messages : memSession;
    const recentMessages = history.slice(-12).map((entry) => ({
      role: entry.role,
      content: entry.content,
    }));

    const reply = await generateChatReply([
      { role: "system", content: systemPrompt },
      ...recentMessages,
    ]);

    if (dbSession) {
      dbSession.messages.push({ role: "assistant", content: reply });
      try {
        await dbSession.save();
      } catch (error) {
        console.warn(`[chat] Failed to persist assistant reply: ${error.message}`);
      }
      response.json({
        sessionId,
        reply,
        messages: normalizeMessages(dbSession.messages),
      });
      return;
    }

    memSession.push({ role: "assistant", content: reply });
    response.json({
      sessionId,
      reply,
      messages: memorySessionMessages(sessionId, memSession),
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
