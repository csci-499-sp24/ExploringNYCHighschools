// data from hs directory
const Sequelize = require('sequelize') // Import Sequelize
const db = require('../db'); // Import Sequelize database instance

const School = db.define("school", {
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
    // Data from school quality reports
    rigorous_instruction_rating: {
        type: Sequelize.STRING
    },
    collaborative_teachers_rating: {
        type: Sequelize.STRING
    },
    supportive_env_rating: {
        type: Sequelize.STRING
    },
    effective_school_leadership: {
        type: Sequelize.STRING
    },
    student_achievement_rating: {
        type: Sequelize.STRING
    },
    trust_rating: {
        type: Sequelize.STRING
    },
    interesting_and_challenging: {
        type: Sequelize.STRING
    },
    effective_teaching_learning: {
        type: Sequelize.STRING
    },
    school_access_student_learning: {
        type: Sequelize.STRING
    },
    high_expectations_communnicated: {
        type: Sequelize.STRING
    },
    teacher_collab: {
        type: Sequelize.STRING
    },
    safe_inclusive: {
        type: Sequelize.STRING
    },
    track_and_meet_goals: {
        type: Sequelize.STRING
    },
    teacher_development_eval: {
        type: Sequelize.STRING
    },
    english_lang_learners: {
        type: Sequelize.STRING
    },
    students_disabilities: {
        type: Sequelize.STRING
    },
    economic_need: {
        type: Sequelize.STRING
    },
    asian: {
        type: Sequelize.STRING
    },
    black: {
        type: Sequelize.STRING
    },
    hispanic: {
        type: Sequelize.STRING
    },
    white: {
        type: Sequelize.STRING
    },
    principal_yr_experience: {
        type: Sequelize.STRING
    },
    teachers_3yr_experience: {
        type: Sequelize.STRING
    },
    chronically_absent_stu: {
        type: Sequelize.STRING
    },
    teacher_attendance_rate: {
        type: Sequelize.STRING
    },

});
School.removeAttribute('id'); // get rid of automate field of id when models are created
// Export school model 
module.exports = School;