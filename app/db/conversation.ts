import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  sequelize.define("Conversation", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    from_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    to_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shared_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_created: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    date_modified: {
      allowNull: false,
      type: DataTypes.DATE,
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
  });
};
