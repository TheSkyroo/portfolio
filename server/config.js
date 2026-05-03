import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(rootDir, ".env") });

export const env = {
  port: Number(process.env.PORT || 3001),
  mongoUri: process.env.MONGODB_URI || "",
  sambaApiKeys: [
    process.env.SAMBANOVA_API_KEY_1,
    process.env.SAMBANOVA_API_KEY_2,
    process.env.SAMBANOVA_API_KEY_3,
  ].filter(Boolean),
  sambaApiBaseUrl: process.env.SAMBANOVA_API_BASE_URL || "https://api.sambanova.ai/v1",
  sambaModel: process.env.SAMBANOVA_MODEL || "Meta-Llama-3.3-70B-Instruct",
  rootDir,
};
