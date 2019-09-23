"use strict";

const DataTypes = require("sequelize");
const sequelize = require("../config/db.config");
const Booking = require("./booking");
// const Location = require("./location");
const Attendee = require("./attendee");
const Business = require("./business");
const Location = require('./location');
const Room = sequelize.define(
  "Room",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "name is required" }
      }
    },

    amenities: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("amenities").split(";");
      },
      set(val) {
        return this.setDataValue("amenities", val.join(";"));
      },
      validate: {
        notNull: { msg: "list of amenities is required" }
      }
    },
    capacity: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notNull: { msg: "capacity is required" }
      }
    }
  },
  {}
);
// Room.associate = function(models) {
// associations can be defined here
Room.belongsTo(Location, {
  foreignKey: "locationId",
  as: "location",
  onDelete: "CASCADE"
});
// };

module.exports = Room;
