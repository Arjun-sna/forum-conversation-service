import { Router } from "express";
import {
  addMessage,
  createConversation,
  getConversation,
  getConversations,
  moveConversationToTrash,
  restoreConversationFromTrash,
} from "../../controllers/conversation";
import { getHealth } from "../../controllers/health";
import { catchAsyncController } from "../../utils/helpers";
import validator from "../../middlewares/validator";
import { getConversationSchema } from "../../utils/validationSchema";

const router = Router();

router.get("/health", catchAsyncController(getHealth));

router.post("/conversation", catchAsyncController(createConversation));
router.get(
  "/conversation",
  validator(getConversationSchema),
  catchAsyncController(getConversations)
);
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
router.post(
  "/conversation/:conversationId/restore",
  catchAsyncController(restoreConversationFromTrash)
);
router.delete(
  "/conversation/:conversationId",
  catchAsyncController(moveConversationToTrash)
);

export default router;
