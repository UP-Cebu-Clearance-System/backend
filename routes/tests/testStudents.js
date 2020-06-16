const test = require("express").Router();
const Student = require("../models/tables/student");


test.get("/", async (req, res) => {
  res.send(await Student.getAllStudents());
});
test.get("/getOne", async (req, res) => {
  res.send(await Student.getStudent("testID"));
});
test.get("/create", async (req, res) => {
  result = await Student.createStudent(
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
  res.send(await Student.deleteStudent("testID"));
});

module.exports = { test };
