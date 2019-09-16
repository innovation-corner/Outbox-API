"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lastName: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      verificationCode: {
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
      locationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Locations",
          key: "id",
          as: "locationId"
        }
      },
      role: {
        type: Sequelize.ENUM("systemAdmin", "subAdmin", "user"),
        defaultValue: "user"
      },
      isVerified: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable("Users");
  }
};
