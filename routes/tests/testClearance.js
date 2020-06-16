const test = require("express").Router(); 
const Clearance = require("../models/tables/clearance");

test.get("/", async (req, res) => {
  res.send(await Clearance.getAllClearances());
});
test.get("/getOne", async (req, res) => {
  res.send(await Clearance.getClearance("testClearanceID"));
});
test.get("/create", async (req, res) => {
  result = await Clearance.createClearance(
    "testClearanceID",
    "testClearanceTypeID",
    "testApproverID",
    58,
    "testClearanceStatus",
    "testClearanceRemarks"
  );
  console.log(result);
  res.send(result);
});

test.get("/update", async (req, res) => {
  res.send(
    await Clearance.updateClearance([
      "updated testClearanceTypeID",
      "updated testApproverID",
      69,
      "updated testClearanceStatus",
      "updated testClearanceRemarks",
      "testClearanceID",
    ])
  );
});

test.get("/delete", async (req, res) => {
  res.send(await Clearance.deleteClearance("testClearanceID"));
});

module.exports = { test };
