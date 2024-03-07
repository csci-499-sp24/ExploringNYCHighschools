const express = require("express");
const cors = require('cors');
const db = require("./models/school");
const app = express();
const School = require("./models/school");

// get hs directory data from api and saves in database
const fetchData = async () => {
    let hs_data_api = 'https://data.cityofnewyork.us/resource/8b6c-7uty.json';
    let school_data = await fetch(hs_data_api);
    let school_data_json = await school_data.json();
    for (let x = 0;x<school_data_json.length;x++) {
        // create a School and it saves in the database
       await School.create({school_name: school_data_json[x].school_name, address: school_data_json[x].location});
    }
};

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

app.get("/api/home", async (req, res) => {
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
