// Purpose: Establishes connection to database
const Sequelize = require("sequelize");
// require the dotenv package and invoke the config() method to load the variables from the .env file into process.env
require("dotenv").config();
// use the Sequelize constructor to create a connection to the database
let sequelize;
// if the NODE_ENV environment variable is equal to 'production', we will use the JAWSDB_URL environment variable to connect to the JawsDB database
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}
// export the connection
module.exports = sequelize;
