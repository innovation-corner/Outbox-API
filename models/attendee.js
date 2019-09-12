'use strict';

const DataTypes = require('sequelize');
const sequelize = require('../config/db.config');

const Attendee = sequelize.define('Attendees', {
  time: {
    type: DataTypes.DATE
  },
  endTime: {
    type: DataTypes.DATE
  },
  duration: DataTypes.INTEGER,
  endTime: {
    type: DataTypes.DATE
  }
}, {});

Attendee.associate = function(models) {
  // associations can be defined here
  Attendee.belongsTo(models.Booking, {
    foreignKey: "bookingId",
    onDelete: "CASCADE",
    as: "attendees"
  });
};

module.exports = Attendee;