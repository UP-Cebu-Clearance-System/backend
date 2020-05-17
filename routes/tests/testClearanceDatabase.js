const test = require("express").Router();
const ClearanceDatabase = require("../models/ClearanceDatabase");


test.get("/", async (req, res) => {
  res.send(await ClearanceDatabase.getAllClearanceDatabases());
});
test.get("/getOne", async (req, res) => {
  res.send(await ClearanceDatabase.isStudentRegistered("testIDs"));
});
test.get("/create", async (req, res) => {
  result = await ClearanceDatabase.createClearanceDatabase(
    "testID",
    "test name",
    "test clearanceID",
    "test collegeID",
    "test password"
  );
  console.log(result);
  res.send(result);
});

test.get("/update", async (req, res) => {
  res.send(
    await ClearanceDatabase.updateClearanceDatabase([
      "updated name",
      "updatedclearanceID",
      "updatedstatus",
      "updatedCollegeID",
      "updatedPassword",
      "testID",
    ])
  );
});

test.get("/delete", async (req, res) => {
  res.send(await ClearanceDatabase.deleteClearanceDatabase("testID"));
});

module.exports = { test };
