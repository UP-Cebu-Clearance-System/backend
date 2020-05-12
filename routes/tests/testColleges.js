const test = require("express").Router();
const Clearance = require("../models/clearance");
const Student = require("../models/entities/student");

const College = require("../models/entities/college");
const Office = require("../models/entities/office");

test.get("/", async (req, res) => {
  res.send(await College.getAllColleges());
});
test.get("/getOne", async (req, res) => {
  res.send(await College.getCollege("testCollegeID"));
});
test.get("/create", async (req, res) => {
  result = await College.createCollege("testCollegeID", "testCollegeName");
  console.log(result);
  res.send(result);
});

test.get("/update", async (req, res) => {
  res.send(await College.updateCollege(["updatedCollegeName", "testCollegeID"]));
});

test.get("/delete", async (req, res) => {
  res.send(await College.deleteCollege("testCollegeID"));
});

module.exports = { test };
