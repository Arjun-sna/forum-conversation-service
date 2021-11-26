import { Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const { Conversation, User, Message } = sequelize.models;

  // Conversation
  Conversation.hasMany(Message, { foreignKey: "conversation_id" });
  Conversation.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });
  Conversation.belongsTo(User, {
    foreignKey: "fromUserId",
    as: "fromUser",
  });
  Conversation.belongsTo(User, {
    foreignKey: "toUserId",
    as: "toUser",
  });

  // Message
  Message.belongsTo(Conversation, { foreignKey: "conversation_id" });

  //User
  User.hasMany(Conversation, { foreignKey: "userId" });
};
