const express = require("express");
const cors = require("cors");
const db = require("./models/school");
const app = express();
const School = require("./models/school");
const fetchData = require("./data");

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

app.get("/api/home", async (req, res) => {
  try {
    const schools = await School.findAll();
    res.json({ schools });
  } catch (err) {
    console.error("Error in fetching schools data", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/search", (req, res) => {
  // Retrieve the search term from the query parameters
  const searchTerm = req.query.term;
  res.json({ searchTerm });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

