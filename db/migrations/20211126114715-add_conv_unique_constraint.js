"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("conversations", {
      fields: ["user_id", "shared_id"],
      type: "unique",
      name: "conv_unique_constraint",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "conversations",
      "conv_unique_constraint"
    );
  },
};
