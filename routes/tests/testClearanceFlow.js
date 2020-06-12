const test = require("express").Router();
const ClearanceFlow = require("../models/tables/clearance-flow");

test.get("/", async (req, res) => {
  res.send(await ClearanceFlow.getAllClearanceFlows());
});
test.get("/getOne", async (req, res) => {
  res.send(await ClearanceFlow.getClearanceFlow(7));
});
test.get("/create", async (req, res) => {
  result = await ClearanceFlow.createClearanceFlow( 
    "testClearanceTypeID",
    "testApproverID",
    1
  );
  console.log(result);
  res.send(result);
});

test.get("/update", async (req, res) => {
  res.send(
    await ClearanceFlow.updateClearanceFlow([
      "updated testClearanceTypeID",
      "updated testApproverID",
      88,
      7,
    ])
  );
});

test.get("/delete", async (req, res) => {
  res.send(await ClearanceFlow.deleteClearanceFlow(7));
});

module.exports = { test };
