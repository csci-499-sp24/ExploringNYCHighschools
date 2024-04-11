// data from hs directory
const Sequelize = require('sequelize') // Import Sequelize
const db = require('../db'); // Import Sequelize database instance

const Review = db.define("review", {
    // Data from Google Reviews
    dbn: {
        type: Sequelize.STRING
    },
    school_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
});
Review.removeAttribute('id'); // get rid of automate field of id when models are created
// Export review model 
module.exports = Review;