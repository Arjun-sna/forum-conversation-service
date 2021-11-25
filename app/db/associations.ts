import { Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const { Conversation, User, Message } = sequelize.models;
  Conversation.hasMany(Message);
  Conversation.belongsTo(User, {
    foreignKey: "user_id",
  });
};
