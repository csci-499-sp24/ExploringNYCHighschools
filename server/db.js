require('dotenv').config() // to use .env file
const { Sequelize } = require("sequelize");

// Instantiate Sequelize instance with database external URL from Render
// When pushing to github, use DB_URL_INTERNAL but for local use external url(get from Render website)
const db = new Sequelize(process.env.DB_URL_INTERNAL, {
    dialect: "postgres",
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

