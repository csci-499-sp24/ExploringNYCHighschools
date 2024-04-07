require('dotenv').config() // to use .env file
const { Sequelize } = require("sequelize");
const pg = require('pg');

// Instantiate Sequelize instance with database external URL from Render
const db = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    dialectModule: pg,
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    },
    define: {
        timestamps: false
    }
}) 
module.exports = db;
