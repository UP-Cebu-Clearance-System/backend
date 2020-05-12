const test = require("express").Router();
const Clearance = require("../models/clearance");
const Student = require("../models/entities/student");

const College = require("../models/entities/college");
const Office = require("../models/entities/office");

test.get("/", async (req, res) => {
  res.send(await Office.getAllOffices());
});
test.get("/getOne", async (req, res) => {
  res.send(await Office.getOffice("testOfficeID"));
});
test.get("/create", async (req, res) => {
  result = await Office.createOffice("testOfficeID", "testOfficeName");
  console.log(result);
  res.send(result);
});

test.get("/update", async (req, res) => {
  res.send(await Office.updateOffice(["updatedOfficeName", "testOfficeID"]));
});

test.get("/delete", async (req, res) => {
  res.send(await Office.deleteOffice("testOfficeID"));
});

module.exports = { test };
