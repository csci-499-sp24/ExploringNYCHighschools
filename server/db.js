// require('dotenv').config() // to use .env file
const { Sequelize } = require("sequelize");
const pg = require('pg');

// Instantiate Sequelize instance with database external URL from Render
// When pushing to github, use DB_URL_INTERNAL but for local use external url(get from Render website)
const db = new Sequelize('postgres://ctrl_p:SDG50DwnH2gevjDqJuSSBAGSUGdYiEju@dpg-cni91hg21fec73cqc8o0-a.ohio-postgres.render.com/hs_db_jldz',{   //process.env.DB_URL_INTERNAL, {
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

