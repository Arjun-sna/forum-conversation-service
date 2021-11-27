import { v4 as uuid } from "uuid";
import { ServerError } from "../exceptions/ServerError";
import db from "../db";
import {
  ConversationModel,
  ConversationInput,
  User as UserType,
  MessageInput,
  UserModel,
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

  private async saveConversationWithMessage(
    conversationData: ConversationInput,
    messageData: MessageInput,
    transaction: Transaction
  ) {
    const conversation = await Conversation.create(conversationData, {
      transaction,
    });

    if (messageData && messageData.message) {
      await Message.create(
        {
          message: messageData.message,
          userId: messageData.userId,
          conversationId: (conversation as ConversationModel).id,
        },
        { transaction }
      );
    }

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
    const messageData = {
      message: conversationInput.message,
      userId: currentUser.id,
    };

    const transaction = await sequelize.transaction();
    const conversationSender = await this.saveConversationWithMessage(
      conversationData,
      messageData,
      transaction
    );
    await this.saveConversationWithMessage(
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

  async getUserConversations(user: any, page: number = 1, limit: number = 10) {
    const offset = limit * (page - 1);
    return user.getConversations({
      where: { draft: false, trash: false },
      limit,
      offset,
      include: ["fromUser", "toUser"],
    });
  }

  async getConversation(conversationId: number, user: any) {
    const conversation = await Conversation.findOne({
      where: { id: conversationId, userId: user.id },
      include: [
        "fromUser",
        "toUser",
        {
          association: "messages",
          attributes: { exclude: ["conversationId"] },
        },
      ],
    });

    if (!conversation) {
      throw new ServerError("Conversation not found", 422);
    }

    return conversation;
  }
}
