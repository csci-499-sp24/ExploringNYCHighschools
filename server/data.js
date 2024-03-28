const School = require("./models/school");
const QualityReports = require("./models/quality_reports")

const fetchData = async () => {
    let hs_data_api = 'https://data.cityofnewyork.us/resource/8b6c-7uty.json';
    let quality_report_api = 'https://data.cityofnewyork.us/resource/7c8x-xds8.json';
    let school_data = await fetch(hs_data_api);
    let quality_data = await fetch(quality_report_api);
    let school_data_json = await school_data.json();
    let quality_data_json = await quality_data.json();
    let dbn = [];
    for (let x = 0;x<school_data_json.length;x++) {
        dbn.push(school_data_json[x].dbn);
    }
    let cleaned_quality_data = [];
    // drop any rows that aren't in HS directory dataset(more up to date dataset)
    for (let x = 0; x<quality_data_json.length;x++)
        if (dbn.includes(quality_data_json[x].dbn))
            cleaned_quality_data.push(quality_data_json[x]);

    for (let x = 0;x<school_data_json.length;x++) {
        await School.create({ 
            // HS diretory data
            dbn: school_data_json[x].dbn,
            school_name: school_data_json[x].school_name,
            description: school_data_json[x].overview_paragraph,
            languages: school_data_json[x].language_classes,
            ap_classes: school_data_json[x].advancedplacement_courses,
            address: school_data_json[x].location,
            phone_number: school_data_json[x].phone_number,
            email: school_data_json[x].school_email,
            website: school_data_json[x].website,
            subways_to_school: school_data_json[x].subway,
            bus_to_school: school_data_json[x].bus,
            grade_span: school_data_json[x].gradespan,
            total_students: school_data_json[x].total_students,
            freshman_schedule: school_data_json[x].freshmanschedule,
            psal_boys: school_data_json[x].psal_sports_boys,
            psal_girls: school_data_json[x].psal_sports_girls,
            grad_rate: school_data_json[x].graduation_rate,
            attendance_rate: school_data_json[x].attendance_rate,
            college_career_rate: school_data_json[x].college_career_rate,
            student_safety: school_data_json[x].pct_stu_safe,
            neighborhood: school_data_json[x].neighborhood});
    }
    for(let j =0;j<cleaned_quality_data.length;j++) {
        await QualityReports.create({ 
            school_name: cleaned_quality_data[j].school_name,
            dbn: cleaned_quality_data[j].dbn,
            rigorous_instruction_rating: cleaned_quality_data[j].rigorous_instruction_percent,
            collaborative_teachers_rating: cleaned_quality_data[j].collaborative_teachers_percent,
            supportive_env_rating: cleaned_quality_data[j].collaborative_teachers_percent,
            effective_school_leadership: cleaned_quality_data[j].effective_school_leadership_1,
            student_achievement_rating: cleaned_quality_data[j].student_achievement_rating,
            trust_rating: cleaned_quality_data[j].trust_percent_positive,
            interesting_and_challenging: cleaned_quality_data[j].quality_review_how_interesting,
            effective_teaching_learning: cleaned_quality_data[j].quality_review_how_effective,
            school_access_student_learning: cleaned_quality_data[j].quality_review_how_well_does,
            high_expectations_communnicated: cleaned_quality_data[j].quality_review_how_clearly,
            teacher_collab: cleaned_quality_data[j].quality_review_how_well_do,
            safe_inclusive: cleaned_quality_data[j].quality_review_how_safe_and,
            track_and_meet_goals: cleaned_quality_data[j].quality_review_how_well_does_2,
            teacher_development_eval: cleaned_quality_data[j].quality_review_how_thoughtful,
            english_lang_learners: cleaned_quality_data[j].percent_english_langauge,
            students_disabilities: cleaned_quality_data[j].percent_students_with,
            economic_need: cleaned_quality_data[j].economic_need_index,
            asian: cleaned_quality_data[j].percent_asian,
            black: cleaned_quality_data[j].percent_black,
            hispanic: cleaned_quality_data[j].percent_hispanic,
            white: cleaned_quality_data[j].percent_white,
            principal_yr_experience: cleaned_quality_data[j].years_of_principal_experience,
            teachers_3yr_experience: cleaned_quality_data[j].percent_of_teachers_with,
            chronically_absent_stu: cleaned_quality_data[j].percent_of_students,
            teacher_attendance_rate: cleaned_quality_data[j].teacher_attendance_rate,
            family_community_ties: cleaned_quality_data[j].strong_family_community_ties_1,
    });
    };
}
module.exports = fetchData;
