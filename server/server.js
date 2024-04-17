require('dotenv').config() // to use .env file

const express = require("express");
const cors = require('cors');
// const db = require("./models/school");
const db = require("./db") // Sequelize instance from db.js
const app = express();
const fetchData = require("./data")
const School = require("./models/school");
const QualityReports = require('./models/quality_reports');
const userRoutes = require('./models/user')
const { Op } = require("sequelize");



const syncDB = async () => {
    try {
       await db.sync({force: true}) // drop table if already exists
        console.log("Database connected");
        await fetchData();        // puts data into database
        console.log("Added data from hs directory");
    }
    catch(err) {
        console.error('Error in syncing database', err);
    }
}
syncDB();

app.use(cors());
app.use(userRoutes);

app.get("/api/home", (req, res) => {
    res.json({message: "Hello World!"});
});

app.get("/api/schools/:dbn", async (req, res) => {
    const {dbn} = req.params;
    try {
        const school = await School.findOne({
            where: {
                dbn: dbn // Use the dbn parameter to search for the school
            }
        });
        if (!school) {
            return res.status(404).json({ error: 'School not found!' });
        }
        res.status(200).json({school});
    } catch (error) {
            console.error('Error fetching school:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
    }
)
app.get("/api/schools/quality-reports/:dbn", async (req, res) => {
    const {dbn} = req.params;
    try {
        const school = await QualityReports.findOne({
            where: {
                dbn: dbn // Use the dbn parameter to search for the school
            }
        });
        if (!school) {
            return res.status(404).json({ error: 'School not found!' });
        }
        res.status(200).json({school});
    } catch (error) {
            console.error('Error fetching school:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
    }
)
app.get("/api/quality-reports", async (req, res) => {
    try {
        const reports = await QualityReports.findAll();
        res.json({ reports });
       
    } catch (err) {
        console.error("Error in fetching school reports", err);
        res.status(500).json({ error: "Internal server error" });
    }
  });
app.get("/api/schools", async (req, res) => {
  try {
    let filters = {};
    if (req.query.languages) {
      // Perform a wildcard search for language filter
      filters.languages = { [Op.like]: `%${req.query.languages}%` };
    }
    if (req.query.neighborhood) {
      // Perform a wildcard search for neighborhood filter
      filters.neighborhood = { [Op.like]: `%${req.query.neighborhood}%` };
    }
    if (req.query.ap_classes && typeof req.query.ap_classes === "string") {
      // Split the search terms
      const apClasses = req.query.ap_classes.split(",");
      // Construct an array of conditions for each search term using Op.substring
      const apClassConditions = apClasses.map((cls) => ({
        ap_classes: { [Op.substring]: cls.trim() },
      }));
      // Combine conditions using OR operator
      if (!filters[Op.and]) filters[Op.and] = [];
      filters[Op.and] = [...filters[Op.and], ...apClassConditions];
    }
    if (req.query.psal_boys && typeof req.query.psal_boys === "string") {
      const psalBoysSports = req.query.psal_boys.split(",");
      const psalBoysConditions = psalBoysSports.map((sport) => ({
        psal_boys: { [Op.substring]: sport.trim() },
      }));
      if (!filters[Op.and]) filters[Op.and] = [];
      filters[Op.and] = [...filters[Op.and], ...psalBoysConditions];
    }
    if (req.query.psal_girls && typeof req.query.psal_girls === "string") {
      const psalGirlsSports = req.query.psal_girls.split(",");
      const psalGirlsConditions = psalGirlsSports.map((sport) => ({
        psal_girls: { [Op.substring]: sport.trim() },
      }));
      if (!filters[Op.and]) filters[Op.and] = [];
      filters[Op.and] = [...filters[Op.and], ...psalGirlsConditions];
    }
    console.log(filters);
    const schools = await School.findAll({
      where: filters,
    });
    res.json({ schools });
  } catch (err) {
    console.error("Error in fetching schools data", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use('/api/users', userRoutes); 

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});