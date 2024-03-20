require('dotenv').config() // to use .env file

const express = require("express");
const cors = require('cors');
// const db = require("./models/school");
const db = require("./db") // Sequelize instance from db.js
const app = express();
const fetchData = require("./data")
const School = require("./models/school");

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

app.get("/api/schools", async (req, res) => {
    try {
      const schools = await School.findAll();
      res.json({ schools });
    } catch (err) {
      console.error("Error in fetching schools data", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
