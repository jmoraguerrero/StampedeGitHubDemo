import "dotenv/config";
import cors from "cors";
import express from "express";
import { HDLSLoadEnv } from "./types/HDLSEnv.js";
import { HDLSSalesforceTokenService } from "./services/HDLSSalesforceTokenService.js";
import { HDLSAgentApiService } from "./services/HDLSAgentApiService.js";
import { HDLSCreateChatRoutes } from "./routes/HDLSChatRoutes.js";

const env = HDLSLoadEnv();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: env.HDLS_ALLOWED_ORIGIN
  })
);

const tokenService = new HDLSSalesforceTokenService(env);
const agentService = new HDLSAgentApiService(env, tokenService);

app.get("/api/hdls/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/hdls/chat", HDLSCreateChatRoutes(agentService));

app.listen(env.HDLS_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`HDLS proxy listening on ${env.HDLS_PORT}`);
});
