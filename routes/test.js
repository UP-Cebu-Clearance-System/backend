const test = require("express").Router();
const ClearanceDatabase = require("../models/ClearanceDatabase");
const Student = require("../models/tables/student");

const ClearanceLog = require("../models/tables/clearance-log");
test.get("/", async (req, res) => {
  res.send(await ClearanceDatabase.fetchAllClearances());
});
test.get("/con", async (req, res) => {
  res.send(await ClearanceDatabase.addClearanceConstraint());
});
test.get("/pop", async (req, res) => {
  res.send(
    await ClearanceDatabase.populateClearanceForStudentID("ct-cosci-2018-2504")
  );
});
test.get("/getOne", async (req, res) => {
  res.send(await ClearanceDatabase.isStudentRegistered("testID"));
});

test.get("/fetchStudentInfo", async (req, res) => {
  res.send(await ClearanceDatabase.fetchStudentInfo("ct-cosci-2018-05992"));
});

test.get("/fetchClearance", async (req, res) => {
  res.send(await ClearanceDatabase.fetchClearance("ct-cosci-2018-3000"));
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
  result = await ClearanceDatabase.studentRegister(
    "2018-3000",
    "Joe Doe",
    "cosci",
    "test password"
  );
  console.log(result);
  res.send(result);
});

test.get("/app", async (req, res) => {
  result = await ClearanceDatabase.studentApplyClearable("2018-3000", 109);
  console.log(result);
  res.send(result);
});
test.get("/can", async (req, res) => {
  result = await ClearanceDatabase.studentCancelClearableApplication(109);
  console.log(result);
  res.send(result);
});
test.get("/log", async (req, res) => {
  result = await ClearanceLog.logClearable(
    15,
    new Date().toISOString(),
    "APPROVER_REJECT"
  );
  console.log(result);
  res.send(result);
});

test.get("/rej", async (req, res) => {
  result = await ClearanceDatabase.approverRejectClearance(109, "bad ka");
  console.log(result);
  res.send(result);
});

test.get("/res", async (req, res) => {
  result = await ClearanceDatabase.approverRestoreClearable(47);
  console.log(result);
  res.send(result);
});
test.get("/col", async (req, res) => {
  result = await Student.getStudentCollegeID("2018-05992");
  console.log(result);
  res.send(result);
});

test.get("/pop", async (req, res) => {
  result = await ClearanceDatabase.populateClearanceForStudentID("2018-2504");
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
