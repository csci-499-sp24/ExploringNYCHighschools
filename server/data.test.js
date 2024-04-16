// Tests aspects of the fetchData() function
const fetchData = require("./data.js");
const db = require("./db.js");
const School = require("./models/school");
const QualityReports = require('./models/quality_reports');


const express = require("express");
const app = require("./server.js");
// const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const request = require('supertest');


mockData_directory = [
   {
       school_name: "Orchard Collegiate Academy",
       dbn: "01M292",
       language_classes: "Spanish",
       advancedplacement_courses: "AP English Literature and Composition, AP United States History, AP Biology",
       neighborhood: "Lower East Side",
       location: "220 Henry Street, Manhattan NY 10002 (40.713362,-73.986051)",
       phone_number: "212-406-9411"
   },
   {
       school_name: "Bushwick Leaders High School for Academic Excellence",
       dbn: "32K556",
       language_classes: "Spanish",
       advancedplacement_courses: "AP Spanish Language and Culture, AP Human Geography, AP Computer Science Principles, AP English Language and Composition, AP United States History, AP Environmental Science",
       neighborhood: "Bushwick",
       location: "797 Bushwick Avenue, Brooklyn NY 11221 (40.695436,-73.927349)",
       phone_number: "718-919-4212"
   }
];
mockData_reports = [
   {
       school_name: "Orchard Collegiate Academy",
       dbn: "01M292",
       percent_asian: "0.117",
       percent_white: "0.047",
       percent_black: "0.246",
       percent_hispanic: "0.567"
   }
];


beforeAll(async () => {
   // connect database
   await db.sync({force:true});
})
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


   expect(schools.length).toBe(mockData_directory.length);
   mockData_directory.map((expectedSchool) => {
       const findSchool = schools.find((school_data) => school_data.dbn === expectedSchool.dbn);
       expect(expectedSchool.school_name).toBe(findSchool.school_name);
       expect(expectedSchool.languages_classes).toBe(findSchool.language);
       expect(expectedSchool.advancedplacement_courses).toBe(findSchool.ap_classes);
       expect(expectedSchool.neighborhood).toBe(findSchool.neighborhood);
       expect(expectedSchool.phone_number).toBe(findSchool.phone_number);
       expect(expectedSchool.location).toBe(findSchool.address);
   })
   expect(quality_reports).toHaveLength(mockData_reports.length);
   mockData_reports.map((expectedSchool) => {
           const findReport = quality_reports.find((report_data) => report_data.dbn === expectedSchool.dbn);
           expect(expectedSchool.school_name).toBe(findReport.school_name);
           expect(expectedSchool.percent_asian).toBe(findReport.asian);
           expect(expectedSchool.percent_white).toBe(findReport.white);
           expect(expectedSchool.percent_black).toBe(findReport.black);
           expect(expectedSchool.percent_hispanic).toBe(findReport.hispanic);
       })
});




describe('GET /api/home', () => {
//    app.get("/api/home", (req, res) => {
//        res.json({message: "Hello World!"});
//    });
   it('should respond with status 200 and message "Hello World!"', async () => {
     const response = await request(app).get('/api/home');
     expect(response.status).toBe(200); // Check if status code is 200
     expect(response.body).toEqual({ message: 'Hello World!' }); // Check if response body matches expected
   });
 });


describe('GET /api/quality-reports', () => {
//    app.get("/api/quality-reports", async (req, res) => {
//        try {
//            const reports = await QualityReports.findAll();
//            res.json({ reports });
      
//        } catch (err) {
//            console.error("Error in fetching school reports", err);
//            res.status(500).json({ error: "Internal server error" });
//        }
//    });
   it('should respond with status 200', async () => {
       const response = await request(app).get('/api/quality-reports');
       expect(response.status).toBe(200); // Check if status code is 200
   });
});

describe('GET /api/schools', () => {
//    app.get("/api/schools", async (req, res) => {
//        try {
//        let filters = {};
//        if (req.query.languages) {
//            // Perform a wildcard search for language filter
//            filters.languages = { [Op.like]: `%${req.query.languages}%` };
//        }
//        if (req.query.neighborhood) {
//            // Perform a wildcard search for neighborhood filter
//            filters.neighborhood = { [Op.like]: `%${req.query.neighborhood}%` };
//        }
//        if (req.query.ap_classes && typeof req.query.ap_classes === "string") {
//            // Split the search terms
//            const apClasses = req.query.ap_classes.split(",");
//            // Construct an array of conditions for each search term using Op.substring
//            const apClassConditions = apClasses.map((cls) => ({
//            ap_classes: { [Op.substring]: cls.trim() },
//            }));
//            // Combine conditions using OR operator
//            if (!filters[Op.and]) filters[Op.and] = [];
//            filters[Op.and] = [...filters[Op.and], ...apClassConditions];
//        }
//        if (req.query.psal_boys && typeof req.query.psal_boys === "string") {
//            const psalBoysSports = req.query.psal_boys.split(",");
//            const psalBoysConditions = psalBoysSports.map((sport) => ({
//            psal_boys: { [Op.substring]: sport.trim() },
//            }));
//            if (!filters[Op.and]) filters[Op.and] = [];
//            filters[Op.and] = [...filters[Op.and], ...psalBoysConditions];
//        }
//        if (req.query.psal_girls && typeof req.query.psal_girls === "string") {
//            const psalGirlsSports = req.query.psal_girls.split(",");
//            const psalGirlsConditions = psalGirlsSports.map((sport) => ({
//            psal_girls: { [Op.substring]: sport.trim() },
//            }));
//            if (!filters[Op.and]) filters[Op.and] = [];
//            filters[Op.and] = [...filters[Op.and], ...psalGirlsConditions];
//        }
//        console.log(filters);
//        const schools = await School.findAll({
//            where: filters,
//        });
//        res.json({ schools });
//        } catch (err) {
//        console.error("Error in fetching schools data", err);
//        res.status(500).json({ error: "Internal server error" });
//        }
//    });
   it('should respond with status 200', async () => {
       const response = await request(app).get('/api/schools');
       expect(response.status).toBe(200); // Check if status code is 200
   });
});
describe('GET /api/schools/:dbn', () => {
//    app.get("/api/schools/:dbn", async (req, res) => {
//        const {dbn} = req.params;
//        try {
//            const school = await School.findOne({
//                where: {
//                    dbn: dbn // Use the dbn parameter to search for the school
//                }
//            });
//            if (!school) {
//                return res.status(404).json({ error: 'School not found!' });
//            }
//            res.status(200).json({school});
//        } catch (error) {
//                console.error('Error fetching school:', error);
//                return res.status(500).json({ error: 'Internal Server Error' });
//              }
//        }
//    )
//    });
   it('should respond with status 200', async () => {
       const response = await request(app).get('/api/schools/01M292');
       expect(response.status).toBe(200); // Check if status code is 200
    });
});
describe('GET /api/schools/:dbn', () => {
//    app.get("/api/schools/:dbn", async (req, res) => {
//        const {dbn} = req.params;
//        try {
//            const school = await School.findOne({
//                where: {
//                    dbn: dbn // Use the dbn parameter to search for the school
//                }
//            });
//            if (!school) {
//                return res.status(404).json({ error: 'School not found!' });
//            }
//            res.status(200).json({school});
//        } catch (error) {
//                console.error('Error fetching school:', error);
//                return res.status(500).json({ error: 'Internal Server Error' });
//              }
//        }
//    )
//    });
   it('should respond with status 404', async () => {
       const response = await request(app).get('/api/schools/error');
       expect(response.status).toBe(404); // Check if status code is 404
    });
});
describe('GET /api/schools/quality-reports/:dbn', () => {
//    app.get("/api/schools/quality-reports/:dbn", async (req, res) => {
//        const {dbn} = req.params;
//        try {
//            const school = await QualityReports.findOne({
//                where: {
//                    dbn: dbn // Use the dbn parameter to search for the school
//                }
//            });
//            if (!school) {
//                return res.status(404).json({ error: 'School not found!' });
//            }
//            res.status(200).json({school});
//        } catch (error) {
//                console.error('Error fetching school:', error);
//                return res.status(500).json({ error: 'Internal Server Error' });
//            }
//        }
//    )
//    });
   it('should respond with status 200', async () => {
       const response = await request(app).get('/api/schools/quality-reports/01M292');
       expect(response.status).toBe(200); // Check if status code is 200
    });
});
describe('GET /api/schools/quality-reports/:dbn', () => {
//    app.get("/api/schools/quality-reports/:dbn", async (req, res) => {
//        const {dbn} = req.params;
//        try {
//            const school = await QualityReports.findOne({
//                where: {
//                    dbn: dbn // Use the dbn parameter to search for the school
//                }
//            });
//            if (!school) {
//                return res.status(404).json({ error: 'School not found!' });
//            }
//            res.status(200).json({school});
//        } catch (error) {
//                console.error('Error fetching school:', error);
//                return res.status(500).json({ error: 'Internal Server Error' });
//            }
//        }
//    )
//    });
   it('should respond with status 404', async () => {
       const response = await request(app).get('/api/schools/quality-reports/error');
       expect(response.status).toBe(404); // Check if status code is 404
    });
});

