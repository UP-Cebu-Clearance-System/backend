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
  let isRegistered = await this.isStudentRegistered(id);
  if (!isRegistered) {
    try {
      await Student.createStudent(id, name, clearanceID, collegeID, password);
      let clrTypeID = await fetchClearanceTypeBasedOnCollegeID(collegeID);
      await populateClearanceFromClearanceFlowBasedOnClearanceTypeID(
        id,
        clrTypeID
      );
      await populateClearanceFromClearanceFlowBasedOnClearanceTypeID(
        id,
        clearanceID
      );
    } catch {}
  } else {
    return { message: "Failed. Student already registered" };
  }
};

const populateClearanceFromClearanceFlowBasedOnClearanceTypeID = async (
  id,
  clearanceTypeID
) => {
  // todo : create rows of clerance elements  in clearanc etable
};
const fetchClearanceTypeBasedOnCollegeID = async (collegeID) => {
  return ClearanceType.getClearanceTypeIDBasedOnCollegeID(collegeID);
};

const isStudentRegistered = async (id) => {
  return (await Student.getStudent(id)) != null;
};

const fetchStudentInfo = async (id) => {
  return await Student.getStudentPublicInfo(id);
};
const fetchClearance = async (clearanceID) => {
  return await Clearance.getClearance(clearanceID);
};

const fetchAllClearances = async () => {
  return await Clearance.getAllClearances();
};
module.exports = {
  fetchClearance,
  getAllStudents,
  fetchAllClearances,
  registerStudent,
  fetchStudentInfo,
  isStudentRegistered,
  fetchClearanceTypeBasedOnCollegeID,
  populateClearanceFromClearanceFlowBasedOnClearanceTypeID,
};
