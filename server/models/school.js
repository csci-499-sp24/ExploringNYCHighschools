// data from hs directory
const Sequelize = require('sequelize') // Import Sequelize
const db = require('../db'); // Import Sequelize database instance

const School = db.define("school", {
    imgUrl: {
        type: Sequelize.STRING
    },
    // Data from HS directory
    neighborhood: {
        type: Sequelize.STRING
    },
    dbn: {
        type: Sequelize.STRING
    },
    school_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(100000), 
        default: "No available description."
    },
    languages: {
        type:Sequelize.STRING(100000),
        default: "No languages offered."
    },
    ap_classes: {
        type: Sequelize.STRING(100000),
        default: "No AP courses offered."
    },
    address: {
        type: Sequelize.STRING,
        default: "Location not available."
    },
    phone_number: {
        type: Sequelize.STRING,
        default: "No phone number available."
    },
    email: {
        type: Sequelize.STRING,
        default: "No email available."
    },
    website: {
        type: Sequelize.STRING,
        default: "No website available."
    },
    subways_to_school: {
        type: Sequelize.STRING,
        default: "Information unavailable."
    },
    bus_to_school: {
        type: Sequelize.STRING(100000),
        default: "Information unavailable."
    },
    grade_span: {
        type: Sequelize.STRING,
        default: "Information unavailable."
    },
    total_students: {
        type: Sequelize.STRING,
        default: "Information unavailable."
    },
    freshman_schedule: {
        type: Sequelize.STRING,
        default: "Information unavailable."
    },
    psal_boys: {
        type: Sequelize.STRING(100000),
        default: "No PSAL sports for boys."
    },
    psal_girls: {
        type: Sequelize.STRING(100000),
        default: "No PSAL sports for girls."
    },
    grad_rate: {
        type: Sequelize.STRING,
        default: "Information unavailable."
    },
    attendance_rate: {
        type: Sequelize.STRING,
        default: "Information unavailable."
    },
    college_career_rate: {
        type: Sequelize.STRING,
        default: "Information unavailable."
    },
    student_safety: {
        type: Sequelize.STRING,
        default: "Information unavailable."
    },
});
School.removeAttribute('id'); // get rid of automate field of id when models are created
// Export school model 
module.exports = School;