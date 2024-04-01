// data from hs directory
const Sequelize = require('sequelize') // Import Sequelize
const db = require('../db'); // Import Sequelize database instance

const QualityReports = db.define("quality_reports", {
    dbn: {
        type: Sequelize.STRING
    },
    school_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
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
    family_community_ties: {
        type: Sequelize.STRING,
    }
});
QualityReports.removeAttribute('id'); // get rid of automate field of id when models are created
// Export quality_reports model 
module.exports = QualityReports;