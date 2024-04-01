require("dotenv").config(); // to use .env file

const express = require("express");
const cors = require("cors");
// const db = require("./models/school");
const db = require("./db"); // Sequelize instance from db.js
const app = express();
const fetchData = require("./data");
const School = require("./models/school");
const QualityReports = require("./models/quality_reports");
const { Op } = require("sequelize");

const syncDB = async () => {
  try {
    await db.sync({ force: true }); // drop table if already exists
    console.log("Database connected");
    await fetchData(); // puts data into database
    console.log("Added data from hs directory");
  } catch (err) {
    console.error("Error in syncing database", err);
  }
};
syncDB();

app.use(cors());

app.get("/api/home", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/api/schools/:dbn", async (req, res) => {
  const { dbn } = req.params;
  try {
    const school = await School.findOne({
      where: {
        dbn: dbn, // Use the dbn parameter to search for the school
      },
    });
    if (!school) {
      return res.status(404).json({ error: "School not found!" });
    }
    res.status(200).json({ school });
  } catch (error) {
    console.error("Error fetching school:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/schools/quality-reports/:dbn", async (req, res) => {
  const { dbn } = req.params;
  try {
    const school = await QualityReports.findOne({
      where: {
        dbn: dbn, // Use the dbn parameter to search for the school
      },
    });
    if (!school) {
      return res.status(404).json({ error: "School not found!" });
    }
    res.status(200).json({ school });
  } catch (error) {
    console.error("Error fetching school:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/schools", async (req, res) => {
  try {
    const { term, neighborhood, languages } = req.query;
    let whereClause = {};

    if (term) {
      // If term is present, search for schools by school name
      whereClause = {
        school_name: { [Op.like]: `%${term}%` },
      };
    }

    if (neighborhood) {
      whereClause.neighborhood = neighborhood;
    }
    if (languages) {
      whereClause.languages = {
        [Op.like]: `%${languages}%`, // Match languages containing the selected language
      };
    }

    console.log(whereClause);
    const schools = await School.findAll({
      where: whereClause,
    });
    res.json(schools);
  } catch (error) {
    console.error("Error fetching schools:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
