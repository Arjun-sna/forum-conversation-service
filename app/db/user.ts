import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateCreated: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "date_created",
      },
      dateModified: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "date_modified",
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );
};
