import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  sequelize.define("User", {
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
    date_created: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    date_modified: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
};
