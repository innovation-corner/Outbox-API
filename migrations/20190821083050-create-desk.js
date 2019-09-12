"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Desks", {
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
      amenities: {
        type: Sequelize.BLOB
      },
      capacity: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable("Desks");
  }
};
