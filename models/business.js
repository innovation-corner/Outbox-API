"use strict";

const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

const Location = require("./location");

const Business = sequelize.define(
  "Businesses",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "Invalid email" },
        notNull: { msg: "email is required" }
      },
      unique: {
        args: true,
        msg: "Email address already in use!"
      }
    }
  },
  {}
);

// Business.associate = function(models) {
// associations can be defined here
Business.hasMany(Location, {
  foreignKey: "businessId",
  as: "locations"
});
// };

module.exports = Business;
