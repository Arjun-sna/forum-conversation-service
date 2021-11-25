import { v4 as uuid } from "uuid";
import { ServerError } from "../exceptions/ServerError";
import db from "../db";
import {
  ConversationModel,
  ConversationInput,
  User as UserType,
} from "../types";

const { Conversation, User } = db.models;
const sequelize = db.sequelize;

export default class ConversationService {
  async validateUser(userId: number): Promise<any> {
    const user = await User.findOne({ where: { id: userId } });

    if (user == null) {
      throw new ServerError("User not found", 422);
    }

    return user;
  }

  async createConversation(
    conversationInput: ConversationInput,
    currentUser: UserType
  ) {
    const toUser = (await this.validateUser(
      conversationInput.toUserId
    )) as UserType;

    const sharedId = uuid();
    const transaction = await sequelize.transaction();
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

    const conversationSender = await Conversation.create(conversationData, {
      transaction,
    });

    await Conversation.create(
      {
        ...conversationData,
        userId: toUser.id,
        unread: true,
      },
      { transaction }
    );

    transaction.commit();
    return (conversationSender as ConversationModel).id;
  }
}
