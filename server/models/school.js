// data from hs directory
const Sequelize = require('sequelize') // Import Sequelize
const db = require('../db'); // Import Sequelize database instance

const School = db.define("school", {
    school_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // description: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    // languages: {
    //     type:Sequelize.STRING
    //     defualt: "No languages offered."
    // },
    // ap_classes: {
    //     type: Sequelize.STRING
    //     defualt: "No AP courses offered."
    // },
    address: {
        type: Sequelize.STRING,
        default: "Location not available."
    },
    // phone_number: {
    //     type: Sequelize.STRING
    //     defualt: "No phone number available."
    // },
    // email: {
    //     type: Sequelize.STRING,
    //     validate: {
    //         isEmail: true
    //     }
    //     defualt: "No email available."
    // },
    // website: {
    //     type: Sequelize.STRING
    //     defualt: "No website available."
    // },
    // subways_to_school: {
    //     type: Sequelize.STRING
    //     defualt: "Information unavailable."
    // },
    // bus_to_school: {
    //     type: Sequelize.STRING
    //     defualt: "Information unavailable."
    // },
    // grade_span: {
    //     type: Sequelize.STRING
    // },
    // total_students: {
    //     type: Sequelize.STRING
    // },
    // freshman_schedule: {
    //     type: Sequelize.STRING
    // },
    // psal_boys: {
    //     type: Sequelize.STRING
    // },
    // psal_girls: {
    //     type: Sequelize.STRING
    // },
    // grad_rate: {
    //     type: Sequelize.STRING
    // },
    // attendance_rate: {
    //     type: Sequelize.STRING
    // },
    // college_career_rate: {
    //     type: Sequelize.STRING
    // },
    // student_safety: {
    //     type: Sequelize.STRING
    // },
});
School.removeAttribute('id'); // get rid of automate field of id when models are created
// Export school model 
module.exports = School;