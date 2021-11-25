import { Request, Response } from "express";
import ConversationService from "../services/conversation";

const conversationService = new ConversationService();
export async function createConversation(req: Request, res: Response) {
  const { body } = req;
  const result = await conversationService.createConversation(body, {
    id: 1,
    username: "arjun",
    email: "arj@gmailc.om",
  });

  res.send({ success: true });
}
