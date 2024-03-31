//import/require Sequelize
const Sequelize = require('sequelize');
//import/require dotenv to use environment variables
require('dotenv').config();

let sequelize;
//JAWSDB_URL is for deploying mysql database to heroku
//else statement is for running app with local host if not deployed to heroku
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}
//export sequelize so it can be used in other files to wrte SQL
module.exports = sequelize;

