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
import {
  addMessageSchema,
  conversationIdParamSchema,
  createConversationSchema,
  getConversationsSchema,
} from "../../utils/validationSchema";

const router = Router();

router.get("/health", catchAsyncController(getHealth));

router.post(
  "/conversation",
  validator(createConversationSchema),
  catchAsyncController(createConversation)
);
router.get(
  "/conversation",
  validator(getConversationsSchema),
  catchAsyncController(getConversations)
);
router.get(
  "/conversation/:conversationId",
  validator(conversationIdParamSchema),
  catchAsyncController(getConversation)
);
router.post(
  "/conversation/:conversationId/message",
  validator(addMessageSchema),
  catchAsyncController(addMessage)
);
router.post(
  "/conversation/:conversationId/safe_delete",
  validator(conversationIdParamSchema),
  catchAsyncController(moveConversationToTrash)
);
router.post(
  "/conversation/:conversationId/restore",
  validator(conversationIdParamSchema),
  catchAsyncController(restoreConversationFromTrash)
);
router.delete(
  "/conversation/:conversationId",
  validator(conversationIdParamSchema),
  catchAsyncController(moveConversationToTrash)
);

export default router;
