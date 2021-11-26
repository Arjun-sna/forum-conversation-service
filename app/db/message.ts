import moment from "moment-timezone";
import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  sequelize.define(
    "Message",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "conversation_id",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "user_id",
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      dateCreated: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "date_created",
        defaultValue: moment().format(),
      },
    },
    {
      tableName: "messages",
      timestamps: false,
    }
  );
};
