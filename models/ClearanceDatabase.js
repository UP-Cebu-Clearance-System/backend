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
  let isRegistered = await isStudentRegistered(id);
  if (!isRegistered) {
    await Student.createStudent(id, name, clearanceID, collegeID, password);
    return await populateClearanceForStudentID(id);
  } else {
    return { message: "Failed. Student already registered" };
  }
};

const populateClearanceForStudentID = async (id) => {
  try {
    let colID = (await Student.getStudentCollegeID(id))["CollegeID"];
    let clearanceTypeID = (
      await ClearanceType.getClearanceTypeIDBasedOnCollegeID(colID)
    )["ClearanceTypeID"];
    let clearanceID = (await Student.getStudentClearanceID(id))["ClearanceID"];

    console.log(clearanceTypeID);
    console.log(clearanceID);

    return await Clearance.populateClearanceBasedOnClearanceIDandClearanceTypeID(
      clearanceID,
      clearanceTypeID
    );
  } catch (e) {
    console.log(e);
    return { message: "Failed retrieving", success: false };
  }

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

const registerApprover = async (id, passwd) => {
  return await Approver.registerApprover(id, passwd);
  //
};
const updateApproverPassword = async (id, passwd) => {
  return await Approver.updatePassword(id, passwd);
  //
};

const fetchApproverInfo = async (id) => {
  return await Approver.getApproverPublicInfo(id);
};

module.exports = {
  fetchClearance,
  fetchApproverInfo,
  registerApprover,
  updateApproverPassword,
  getAllStudents,
  fetchAllClearances,
  registerStudent,
  fetchStudentInfo,
  isStudentRegistered,
  fetchClearanceTypeBasedOnCollegeID,
  populateClearanceForStudentID,
};
