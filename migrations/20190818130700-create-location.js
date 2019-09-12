"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Locations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      info: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.STRING
      },

      phoneNumber: {
        type: Sequelize.STRING
      },

      businessId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Businesses",
          key: "id",
          as: "businessId"
        }
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Locations");
  }
};
