const express = require("express");
const cors = require('cors');
const db = require("./models/school");
const app = express();
const fetchData = require("./data")

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

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});