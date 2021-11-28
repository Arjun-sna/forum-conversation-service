import {
  addMessage,
  createConversation,
  getConversation,
  getConversations,
  moveConversationToTrash,
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
router.post(
  "/conversation/:conversationId/message",
  catchAsyncController(addMessage)
);
router.post(
  "/conversation/:conversationId/safe_delete",
  catchAsyncController(moveConversationToTrash)
);

export default router;
