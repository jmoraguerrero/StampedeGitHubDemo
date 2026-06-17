import { Router } from "express";
import { HDLSAgentApiError, HDLSAgentApiService } from "../services/HDLSAgentApiService.js";

export function HDLSCreateChatRoutes(agentService: HDLSAgentApiService): Router {
  const router = Router();

  router.post("/start", async (_req, res) => {
    try {
      const sessionId = await agentService.HDLSStartSession();
      res.json({ sessionId });
    } catch (error) {
      if (error instanceof HDLSAgentApiError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error instanceof Error ? error.message : "Unknown start error" });
    }
  });

  router.post("/message", async (req, res) => {
    const { sessionId, message } = req.body as { sessionId?: string; message?: string };
    if (!sessionId || !message) {
      res.status(400).json({ error: "sessionId and message are required." });
      return;
    }

    try {
      const result = await agentService.HDLSSendMessage(sessionId, message);
      res.json({
        sessionId: result.sessionId,
        reply: {
          id: crypto.randomUUID(),
          role: "assistant",
          text: result.text,
          createdAt: new Date().toISOString()
        }
      });
    } catch (error) {
      if (error instanceof HDLSAgentApiError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown message error"
      });
    }
  });

  router.post("/end", (_req, res) => {
    res.json({ ok: true });
  });

  return router;
}
