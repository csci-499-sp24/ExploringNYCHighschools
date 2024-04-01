require("dotenv").config(); // to use .env file

const express = require("express");
const cors = require("cors");
// const db = require("./models/school");
const db = require("./db"); // Sequelize instance from db.js
const app = express();
const { Op } = require("sequelize");
const fetchData = require("./data");
const School = require("./models/school");

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

app.get("/api/schools", async (req, res) => {
  try {
    const { term, neighborhood, languages } = req.query;
    let whereClause = {};

    // If term is present, search for schools by school name
    if (term) {
      whereClause.school_name = { [Op.like]: `%${term}%` };
    }

    // If neighborhood is present, add it to the whereClause
    if (neighborhood) {
      whereClause.neighborhood = neighborhood;
    }

    // If languages is present, add it to the whereClause
    if (languages) {
      whereClause.languages = {
        [Op.like]: `%${languages}%`,
      };
    }

    const schools = await School.findAll({
      where: whereClause,
    });
    res.json(schools);
  } catch (error) {
    console.error("Error fetching schools:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use(express.json());

app.get("/api/neighborhoods", async (req, res) => {
  try {
    const uniqueNeighborhoods = await School.aggregate(
      "neighborhood",
      "DISTINCT",
      { plain: false }
    );
    const neighborhoodsArray = uniqueNeighborhoods.map((obj) => obj.DISTINCT);
    res.json(neighborhoodsArray);
  } catch (error) {
    console.error("Error fetching unique neighborhoods:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/languages", async (req, res) => {
  try {
    const schools = await School.findAll();
    const allLanguages = schools.reduce((acc, school) => {
      if (school.languages) {
        // Check if languages field is not null
        const languages = school.languages
          .split(",")
          .map((lang) => lang.trim());
        return [...acc, ...languages];
      }
      return acc;
    }, []);
    const uniqueLanguages = Array.from(new Set(allLanguages));
    res.json(uniqueLanguages);
  } catch (error) {
    console.error("Error fetching unique languages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
