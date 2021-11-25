import { CustomRequest } from "../types";
import { Response } from "express";
import ConversationService from "../services/conversation";

const conversationService = new ConversationService();
export async function createConversation(req: CustomRequest, res: Response) {
  const { body, currentUser } = req;
  const result = await conversationService.createConversation(
    body,
    currentUser
  );

  res.send({ id: result });
}
