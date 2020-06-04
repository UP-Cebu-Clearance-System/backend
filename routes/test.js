const test = require("express").Router();
const ClearanceDatabase = require("../models/ClearanceDatabase");
const Student = require("../models/entities/student");

test.get("/", async (req, res) => {
  res.send(await ClearanceDatabase.fetchAllClearances());
});
test.get("/getOne", async (req, res) => {
  res.send(await ClearanceDatabase.isStudentRegistered("testID"));
});

test.get("/fetchStudentInfo", async (req, res) => {
  res.send(await ClearanceDatabase.fetchStudentInfo("ct-cosci-2018-05992"));
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

test.get("/reg", async (req, res) => {
  result = await ClearanceDatabase.registerStudent(
    "2018-2504",
    "John Doe",
    "ct-cosci-2018-2504",
    "cosci",
    "test password"
  );
  console.log(result);
  res.send(result);
});

test.get("/app", async (req, res) => {
  result = await ClearanceDatabase.studentApplyClearance("2018-2504", "218");
  console.log(result);
  res.send(result);
});
test.get("/col", async (req, res) => {
  result = await Student.getStudentCollegeID("2018-05992");
  console.log(result);
  res.send(result);
});
test.get("/pop", async (req, res) => {
  result = await ClearanceDatabase.populateClearanceForStudentID("2018-05992");
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
