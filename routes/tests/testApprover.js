const test = require("express").Router();
const Approver = require("../models/tables/approver");

test.get("/", async (req, res) => {
  res.send(await Approver.getAllApprovers());
});
test.get("/getOne", async (req, res) => {
  res.send(await Approver.getApprover("testApproverID"));
});
test.get("/create", async (req, res) => {
  result = await Approver.createApprover(
    "testApproverID",
    "testApproverName",
    "test employee id",
    "test title",
    "test officeID",
    "test Password"
  );
  console.log(result);
  res.send(result);
});

test.get("/update", async (req, res) => {
  res.send(
    await Approver.updateApprover([
      "updated testApproverName",
      "updated test employee id",
      "updated test title",
      "updated test officeID",
      "updated test Password",
      "testApproverID",
    ])
  );
});

test.get("/delete", async (req, res) => {
  res.send(await Approver.deleteApprover("testApproverID"));
});

module.exports = { test };
