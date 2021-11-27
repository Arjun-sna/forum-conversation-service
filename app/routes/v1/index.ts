import {
  createConversation,
  getConversation,
  getConversations,
} from "../../controllers/conversation";
import { Router } from "express";
import { getHealth } from "../../controllers/health";
import { catchAsyncController } from "../../utils/helpers";

const router = Router();

router.get("/health", catchAsyncController(getHealth));

router.post("/conversation", catchAsyncController(createConversation));
router.get("/conversation", catchAsyncController(getConversations));
router.get(
  "/conversation/:conversationId",
  catchAsyncController(getConversation)
);

export default router;
