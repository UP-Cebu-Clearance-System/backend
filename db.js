const { Database, OPEN_READWRITE } = require("sqlite3").verbose();

// const ClearanceDatabase = require("./models/ClearanceDatabase");
const db = new Database(`./clearance.sqlite`, OPEN_READWRITE, async (err) => {
  if (err) {
    console.log(`Can't connect to the database.`);
    console.log(err);
  } else {
    // console.log(await ClearanceDatabase.addClearanceConstraint());
    console.log(`Connected to the database.`);
  }
});

module.exports = { db };
