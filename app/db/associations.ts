import { Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const { Conversation, User, Message } = sequelize.models;

  // Conversation
  Conversation.hasMany(Message, { foreignKey: "conversation_id" });
  Conversation.belongsTo(User, {
    foreignKey: "user_id",
  });

  // Message
  Message.belongsTo(Conversation, { foreignKey: "conversation_id" });

  //User
  User.hasMany(Conversation, { foreignKey: "user_id" });
};
