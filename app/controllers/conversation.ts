import { CustomRequest } from "../types";
import { Response } from "express";
import ConversationService from "../services/conversation";
import { ServerError } from "../exceptions/ServerError";

const conversationService = new ConversationService();
export async function createConversation(req: CustomRequest, res: Response) {
  const { body: conversationData, currentUser } = req;

  if (conversationData.toUserId === currentUser.id) {
    throw new ServerError("Cannot send message to yourself", 422);
  }

  const result = await conversationService.createConversation(
    conversationData,
    currentUser
  );

  res.send({ id: result });
}

export async function getConversations(req: CustomRequest, res: Response) {
  const { currentUser, query } = req;
  const page = query.page ? parseInt(query.page as string) : 1;
  const perPage = query.per_page ? parseInt(query.per_page as string) : 10;

  const result = await conversationService.getUserConversations(
    currentUser,
    page,
    perPage
  );
  res.send(result);
}

export async function getConversation(req: CustomRequest, res: Response) {
  const { currentUser, params } = req;
  // todo: validate params
  const { conversationId } = params;
  const result = await conversationService.getConversation(
    parseInt(conversationId),
    currentUser
  );
  res.send(result);
}

export async function addMessage(req: CustomRequest, res: Response) {
  const { currentUser, body: messageData, params } = req;
  const { conversationId } = params;
  // todo: validate messageData

  const result = await conversationService.addMessageToConversation(
    parseInt(conversationId),
    messageData,
    currentUser
  );

  res.send(result);
}

export async function moveConversationToTrash(
  req: CustomRequest,
  res: Response
) {
  const { currentUser, params } = req;
  const { conversationId } = params;

  // todo: validate messageData
  const result = await conversationService.changeConversationTrashStatus(
    parseInt(conversationId),
    currentUser,
    true
  );

  res.send({ success: true });
}

export async function restoreConversationFromTrash(
  req: CustomRequest,
  res: Response
) {
  const { currentUser, params } = req;
  const { conversationId } = params;

  // todo: validate messageData
  const result = await conversationService.changeConversationTrashStatus(
    parseInt(conversationId),
    currentUser,
    false
  );

  res.send({ success: true });
}

export async function deleteConversation(req: CustomRequest, res: Response) {
  const { currentUser, params } = req;
  const { conversationId } = params;

  // todo: validate messageData
  const result = await conversationService.deleteConversation(
    parseInt(conversationId),
    currentUser
  );

  res.send({ success: true });
}
