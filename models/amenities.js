'use strict';
module.exports = (sequelize, DataTypes) => {
  const Amenities = sequelize.define('Amenities', {
    name: DataTypes.STRING
  }, {});
  Amenities.associate = function(models) {
    // associations can be defined here
  };
  return Amenities;
};