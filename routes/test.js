const test = require("express").Router();
const ClearanceDatabase = require("../models/ClearanceDatabase");


test.get("/", async (req, res) => {
  res.send(await ClearanceDatabase.fetchAllClearances());
});
test.get("/getOne", async (req, res) => {
  res.send(await ClearanceDatabase.isStudentRegistered("testID"));
});


test.get("/fetchStudentInfo", async (req, res) => {
  res.send(await ClearanceDatabase.fetchStudentInfo("2018-05996"));
});


test.get("/fetchClearance", async (req, res) => {
  res.send(await ClearanceDatabase.fetchClearance("cosci-2018-05994"));
});


test.get("/fetch3", async (req, res) => {
  res.send(await ClearanceDatabase.isStudentRegistered("testID"));
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
