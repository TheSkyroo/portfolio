import app from "./app.js";
import { env } from "./config.js";

app.listen(env.port, () => {
  console.log(`Portfolio chat server listening on http://localhost:${env.port}`);
});
