const test = require("express").Router();
const Clearance = require("../models/clearance");
const Student = require("../models/entities/student");

const College = require("../models/entities/college");
const Office = require("../models/entities/office");
const ClearanceType = require("../models/entities/clearance-type");

test.get("/", async (req, res) => {
  res.send(await ClearanceType.getAllClearanceTypes());
});
test.get("/getOne", async (req, res) => {
  res.send(await ClearanceType.getClearanceType("testClearanceTypeID"));
});
test.get("/create", async (req, res) => {
  result = await ClearanceType.createClearanceType("testClearanceTypeID", "testClearanceTypeName");
  console.log(result);
  res.send(result);
});

test.get("/update", async (req, res) => {
  res.send(await ClearanceType.updateClearanceType(["updatedClearanceTypeName", "testClearanceTypeID"]));
});

test.get("/delete", async (req, res) => {
  res.send(await ClearanceType.deleteClearanceType("testClearanceTypeID"));
});

module.exports = { test };
