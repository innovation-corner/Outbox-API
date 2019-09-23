"use strict";

const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");

// const Booking = require("./booking");
const Desk = require("./desk");
const User = require("./user");
const Room = require("./room");
const Location = require("./location");
const Business = require("./business");
const Booking = sequelize.define(
  "Bookings",
  {
    name: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATEONLY
    },
    duration: {
      type: DataTypes.INTEGER
    },
    time: {
      type: DataTypes.DATE
    },
    endTime: {
      type: DataTypes.DATE
    },
    type: {
      type: DataTypes.STRING
    }
  },
  {}
);

// Booking.associate = function(models) {
// associations can be defined here
Booking.belongsTo(Location, {
  foreignKey: "locationId",
  onDelete: "CASCADE"
});
Booking.belongsTo(Room, {
  foreignKey: "roomId",
  onDelete: "CASCADE"
});
// };

module.exports = Booking;
