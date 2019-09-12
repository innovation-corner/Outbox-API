'use strict';

const DataTypes = require('sequelize');
const sequelize = require('../config/db.config');

const Location = sequelize.define('Locations', {
  name: DataTypes.STRING,
  info: DataTypes.TEXT
}, {});

Location.associate = function(models) {
  // associations can be defined here
  Location.belongsTo(models.Business, {
    foreignKey: "businessId",
    onDelete: "CASCADE"
  });
  Location.hasMany(models.Desk, {
    foreignKey: "locationId",
    as: "desks"
  });
  Location.hasMany(models.Booking, {
    foreignKey: "locationId",
    as: "bookings"
  });
  // Location.hasMany(models.Room, {
  //   foreignKey: "locationId",
  //   as: "rooms"
  // });
  Location.hasMany(models.User, {
    foreignKey: "locationId",
    as: "users"
  });
};

module.exports = Location;



