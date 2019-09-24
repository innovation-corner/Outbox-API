"use strict";

const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Location = sequelize.define(
  "Locations",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    info: {
      type: DataTypes.TEXT
    },
    address: {
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.STRING
    },

    phoneNumber: {
      type: DataTypes.STRING
    },
  },
  {}
);

module.exports = Location;
