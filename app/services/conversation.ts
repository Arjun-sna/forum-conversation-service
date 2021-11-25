import { v4 as uuid } from "uuid";
import { ServerError } from "../exceptions/ServerError";
import db from "../db";
import { ConversationInput, User as UserType } from "../types";

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
    conversationData: ConversationInput,
    currentUser: UserType
  ) {
    const toUser = (await this.validateUser(
      conversationData.toUserId
    )) as UserType;

    const sharedId = uuid();
    const transaction = await sequelize.transaction();
    const conversationSender = await Conversation.create(
      {
        subject: conversationData.subject,
        user_id: currentUser.id,
        from_user_id: currentUser.id,
        to_user_id: toUser.id,
        shared_id: sharedId,
        trash: false,
        unread: false,
        draft: false,
      },
      { transaction }
    );

    const conversationReceiver = await Conversation.create(
      {
        subject: conversationData.subject,
        user_id: toUser.id,
        from_user_id: currentUser.id,
        to_user_id: toUser.id,
        shared_id: sharedId,
        trash: false,
        unread: true,
        draft: false,
      },
      { transaction }
    );

    transaction.commit();
    return conversationSender;
  }
}
