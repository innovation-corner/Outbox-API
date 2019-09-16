const Sequelize = require('sequelize');
const database = require('./config');
const dotenv = require('dotenv');

dotenv.config();

let sequelize;

if (process.env.CLEAR_DATABASE_URL) {

    /** @type {Sequelize} [database connection for heroku production] */
    sequelize = new Sequelize(process.env.CLEAR_DATABASE_URL, {
        dialect: 'mysql',
        protocol: 'mysql',
        port: 5432,
        host: "<heroku host>",
        logging: true //false
    });
  
  } else {

    /** @type {Sequelize} [database connection for development env] */
    sequelize = new Sequelize(
        database.development.database,
        database.development.username,
        database.development.password,
        {
            host: database.development.host,
            dialect: database.development.dialect,
            operatorsAliases: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    );
}

module.exports = sequelize;