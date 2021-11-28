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

    await transaction.commit();
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

  async getConversation(
    conversationId: number,
    user: any,
    withAssociation: boolean = true
  ) {
    const association = withAssociation
      ? {
          include: [
            "fromUser",
            "toUser",
            {
              association: "messages",
              attributes: { exclude: ["conversationId"] },
            },
          ],
        }
      : {};

    const conversation = await Conversation.findOne({
      where: { id: conversationId, userId: user.id },
      ...association,
    });

    if (!conversation) {
      throw new ServerError("Conversation not found", 422);
    }

    return conversation;
  }

  async addMessageToConversation(
    conversationId: number,
    messageData: MessageInput,
    user: any
  ) {
    const conversation: any = await this.getConversation(
      conversationId,
      user,
      false
    );

    const receiverId =
      user.id === conversation.toUserId
        ? conversation.fromUserId
        : conversation.toUserId;

    const transaction = await sequelize.transaction();
    try {
      const message = await Message.create(
        {
          message: messageData.message,
          userId: user.id,
          conversationId: (conversation as ConversationModel).id,
        },
        { transaction }
      );

      const [receiverConversation]: any = await Conversation.findOrCreate({
        where: {
          userId: receiverId,
          sharedId: conversation.sharedId,
        },
        defaults: {
          subject: conversation.subject,
          userId: receiverId,
          fromUserId: user.id,
          toUserId: receiverId,
          sharedId: conversation.sharedId,
          trash: false,
          unread: false,
          draft: false,
        },
        transaction,
      });

      await Message.create(
        {
          message: messageData.message,
          userId: user.id,
          conversationId: receiverConversation.id,
        },
        { transaction }
      );
      await transaction.commit();

      return message;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}
