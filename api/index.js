// Vercel Serverless Function adapter.
// Vercel picks up any file inside /api and runs it as a serverless function.
// We simply re-export the Express app so all /api/* routes work unchanged.
import app from "../server/app.js";

export default app;
