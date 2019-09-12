'use strict';

const DataTypes = require('sequelize');
const sequelize = require('../config/db.config');

const Booking = sequelize.define('Bookings', {
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
}, {});

Booking.associate = function(models) {
  // associations can be defined here
  // Booking.belongsTo(models.Room, {
  //   foreignKey: "roomId",
  //   onDelete: "CASCADE"
  // });
  Booking.hasOne(models.Location, {
    foreignKey: "locationId",
    onDelete: "CASCADE"
  });
};

module.exports = Booking;
