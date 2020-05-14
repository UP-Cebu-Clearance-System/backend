const Student = require("./entities/student");
const Office = require("./entities/office");
const ClearanceType = require("./entities/clearance-type");
const College = require("./entities/college");
const Clearance = require("./entities/clearance");
const ClearanceFlow = require("./entities/clearance-flow");
const Approver = require("./entities/approver");
const Admin = require("./entities/admin");

const getAllStudents = async () => {
  return await Student.getAllStudents();
};

const registerStudent = async (id, name, clearanceID, collegeID, password) => {
  return await Student.createStudent(
    id,
    name,
    clearanceID,
    collegeID,
    password
  );
};

module.exports = { getAllStudents, registerStudent };
