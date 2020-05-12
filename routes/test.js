const test = require("express").Router();
const Clearance = require("../models/clearance");
const Student = require("../models/entities/student");

test.get("/", async (req, res) => {
  console.log("run debug");

  res.send(await Student.getAllStudents());
});
test.get("/getOne", async (req, res) => {
  console.log("run debug");

  res.send(await Student.getStudent("testID"));
});
test.get("/create", async (req, res) => {
  console.log("run debug");
  result = await Student.createStudent(
    "testID",
    "test name",
    "test clearanceID",
    "test collegeID",
    "test password"
  );
console.log(result)
  res.send(result);
});

test.get("/update", async (req, res) => {
  console.log("run debug");

  res.send(
    await Student.updateStudent([
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
  console.log("run debug");

  res.send(await Student.deleteStudent("testID"));
});

module.exports = { test };
