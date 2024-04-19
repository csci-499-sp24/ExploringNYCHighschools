// Tests aspects of the fetchData() function 
const fetchData = require("./data.js");
const db = require("./db.js");
const School = require("./models/school");
const QualityReports = require('./models/quality_reports');

mockData_directory = [
    {
        school_name: "school1",
        dbn: "01M292",
        language_classes: "Spanish",
        advancedplacement_courses: "AP English Literature and Composition, AP United States History, AP Biology",
        neighborhood: "Lower East Side",
        location: "220 Henry Street, Manhattan NY 10002 (40.713362,-73.986051)",
        phone_number: "212-406-9411",
    },
    {
        school_name: "school2",
        dbn: "32K556",
        language_classes: "Spanish",
        advancedplacement_courses: "AP Spanish Language and Culture, AP Human Geography, AP Computer Science Principles, AP English Language and Composition, AP United States History, AP Environmental Science",
        neighborhood: "Bushwick",
        location: "797 Bushwick Avenue, Brooklyn NY 11221 (40.695436,-73.927349)",
        phone_number: "718-919-4212",
    }
];
mockData_reports = [
    {
        school_name: "school1",
        dbn: "01M292",
        percent_asian: "0.117",
        percent_white: "0.047",
        percent_black: "0.246",
        percent_hispanic: "0.567",
    }
];

// beforeAll(async () => {
//     // connect database
//     await db.sync({force:true});
// })
afterEach(async () => {
    // Delete all records created during the test
    const school_name_values = mockData_directory.map(data => data.school_name);
    const school_name_values_report = mockData_reports.map(data => data.school_name);
    await School.destroy({ where: { school_name: school_name_values} });
    await QualityReports.destroy({ where: { school_name: school_name_values_report} });
});
afterAll(async () => {
    // Close database connection for cleanup
    await db.close();
})
test("Should fetch data from api call and create School and QualityReport models in the database", async () => {
    const hs_data_api = "https://data.cityofnewyork.us/resource/8b6c-7uty.json";
    const quality_report_api = "https://data.cityofnewyork.us/resource/7c8x-xds8.json";

    jest.spyOn(global, "fetch").mockImplementation((api_url) => {
        if (api_url === hs_data_api) {
            return Promise.resolve({
                json: () => Promise.resolve(mockData_directory),
            });
        } 
        else if (api_url === quality_report_api) {
            return Promise.resolve({
                json: () => Promise.resolve(mockData_reports),
            });
        } 
    });

    await fetchData();

    const schools = await School.findAll();
    const quality_reports = await QualityReports.findAll();

    mockData_directory.map((expectedSchool) => {
        const findSchool = schools.find((school_data) => school_data.school_name === expectedSchool.school_name);
        expect(expectedSchool.dbn).toBe(findSchool.dbn);
        expect(expectedSchool.languages_classes).toBe(findSchool.language);
        expect(expectedSchool.advancedplacement_courses).toBe(findSchool.ap_classes);
        expect(expectedSchool.neighborhood).toBe(findSchool.neighborhood);
        expect(expectedSchool.phone_number).toBe(findSchool.phone_number);
        expect(expectedSchool.location).toBe(findSchool.address);
    })
    mockData_reports.map((expectedSchool) => {
            const findReport = quality_reports.find((report_data) => report_data.school_name === expectedSchool.school_name);
            expect(expectedSchool.dbn).toBe(findReport.dbn);
            expect(expectedSchool.percent_asian).toBe(findReport.asian);
            expect(expectedSchool.percent_white).toBe(findReport.white);
            expect(expectedSchool.percent_black).toBe(findReport.black);
            expect(expectedSchool.percent_hispanic).toBe(findReport.hispanic);
        })
});



