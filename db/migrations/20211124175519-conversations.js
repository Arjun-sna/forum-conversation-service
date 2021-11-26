"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("conversations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      from_user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      to_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      shared_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_created: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      date_modified: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      trash: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      draft: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      unread: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("conversations");
  },
};
