import { v4 as uuid } from "uuid";
import { ServerError } from "../exceptions/ServerError";
import db from "../db";
import {
  ConversationModel,
  ConversationInput,
  User as UserType,
  MessageInput,
} from "../types";
import { Transaction } from "sequelize/types";

const { Conversation, User, Message } = db.models;
const sequelize = db.sequelize;

export default class ConversationService {
  private async validateUser(userId: number): Promise<any> {
    const user = await User.findOne({ where: { id: userId } });

    if (user == null) {
      throw new ServerError("User not found", 422);
    }

    return user;
  }

  private async saveConversation(
    conversationData: ConversationInput,
    messageData: MessageInput,
    transaction: Transaction
  ) {
    const conversation = await Conversation.create(conversationData, {
      transaction,
    });

    await Message.create(
      {
        message: messageData.message,
        userId: messageData.userId,
        conversationId: (conversation as ConversationModel).id,
      },
      { transaction }
    );

    return conversation;
  }

  async createConversation(
    conversationInput: ConversationInput,
    currentUser: UserType
  ) {
    const toUser = (await this.validateUser(
      conversationInput.toUserId
    )) as UserType;

    const sharedId = uuid();
    const conversationData = {
      subject: conversationInput.subject,
      userId: currentUser.id,
      fromUserId: currentUser.id,
      toUserId: toUser.id,
      sharedId: sharedId,
      trash: false,
      unread: false,
      draft: false,
    };
    const messageData = { message: "test", userId: currentUser.id };

    const transaction = await sequelize.transaction();
    const conversationSender = await this.saveConversation(
      conversationData,
      messageData,
      transaction
    );
    await this.saveConversation(
      {
        ...conversationData,
        userId: toUser.id,
        unread: true,
      },
      messageData,
      transaction
    );

    transaction.commit();
    return (conversationSender as ConversationModel).id;
  }
}
