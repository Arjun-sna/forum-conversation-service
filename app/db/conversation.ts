import moment from "moment-timezone";
import { ConversationModel } from "../types";
import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  sequelize.define<ConversationModel>(
    "Conversation",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      fromUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "from_user_id",
      },
      toUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "to_user_id",
      },
      sharedId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "shared_id",
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateCreated: {
        allowNull: true,
        type: DataTypes.DATE,
        field: "date_created",
        defaultValue: moment().format(),
      },
      dateModified: {
        allowNull: true,
        type: DataTypes.DATE,
        field: "date_modified",
      },
      trash: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      draft: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      unread: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: "conversations",
      timestamps: false,
    }
  );
};
