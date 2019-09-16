const Sequelize = require('sequelize');
const database = require('./config');

let sequelize;

if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true //false
    })
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