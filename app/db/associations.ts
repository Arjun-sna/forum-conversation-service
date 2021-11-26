import { Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const { Conversation, User, Message } = sequelize.models;

  // Conversation
  Conversation.hasMany(Message, { foreignKey: "conversation_id" });
  Conversation.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
  });
  Conversation.belongsTo(User, {
    foreignKey: "from_user_id",
    as: "fromUser",
  });
  Conversation.belongsTo(User, {
    foreignKey: "to_user_id",
    as: "toUser",
  });

  // Message
  Message.belongsTo(Conversation, { foreignKey: "conversation_id" });

  //User
  User.hasMany(Conversation, { foreignKey: "user_id" });
};
