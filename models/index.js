'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  
  //for postgre configurations
  // sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
  //   dialect:  'postgres',
  //   protocol: 'postgres',
  //   port:     match[4],
  //   host:     match[3],
  //   logging:  true //false
  // });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

global.models = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  User: sequelize.import(__dirname + "/user"),
  Business: sequelize.import(__dirname + "/business"),
  Booking: sequelize.import(__dirname + "/booking"),
  Location: sequelize.import(__dirname + "/location"),
  Desk: sequelize.import(__dirname + "/desk"),
  Attendee: sequelize.import(__dirname + "/attendee"),
};

module.exports = global.models;
