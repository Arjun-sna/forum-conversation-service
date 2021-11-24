'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      conversation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "conversations",
          key: "id",
        },
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: 'SET NULL',
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      date_created: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("conversations");
  }
};
