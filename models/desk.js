'use strict';

const DataTypes = require('sequelize');
const sequelize = require('../config/db.config');

const Desk = sequelize.define('Desks', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amenities: {
    type: DataTypes.BLOB
  },
  capacity: DataTypes.NUMBER
}, {});

Desk.associate = function(models) {
  // associations can be defined here
  // Desk.belongsTo(models.Location, {
  //   foreignKey: "locationId",
  //   onDelete: "CASCADE"
  // });
  Desk.hasMany(models.Booking, {
    foreignKey: "deskId",
    as: "bookings"
  });
};

module.exports = Desk;