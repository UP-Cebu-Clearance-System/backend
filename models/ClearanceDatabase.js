const Student = require("./entities/student");
const Office = require("./entities/office");
const ClearanceType = require("./entities/clearance-type");
const College = require("./entities/college");
const Clearance = require("./entities/clearance");
const ClearanceQueue = require("./entities/clearance-queue");
const ClearanceLog = require("./entities/clearance-log");
const ClearanceFlow = require("./entities/clearance-flow");
const Approver = require("./entities/approver");
const Admin = require("./entities/admin");

const studentRegister = async (id, name, clearanceID, collegeID, password) => {
  let isRegistered = await isStudentRegistered(id);
  if (!isRegistered) {
    await Student.createStudent(id, name, clearanceID, collegeID, password);
    return await populateClearanceForStudentID(id);
  } else {
    return { message: "Failed. Student already registered" };
  }
};

const studentUpdatePassword = async (id, passwd) => {
  return await Student.updatePassword(id, passwd);

  // todo update password
};

const studentUpdateInformation = async () => {
  // todo update info
};

const studentApplyClearable = async (id, cid) => {
  try {
    let clrInfo = await Clearance.getClearanceInfoFromCID(cid);
    console.log(clrInfo);
    clrID = clrInfo["ClearanceID"];
    let info = await Student.getStudentInfoFromClearanceID(clrID);

    console.log(info);
    let name = info["Name"];
    let studentID = info["StudentID"];
    let apprvrID = clrInfo["ApproverID"];
    console.log(studentID);
    console.log(id);
    if (studentID != id) {
      return { message: "Unauthorized" };
    }

    await ClearanceQueue.enqueueClearable(
      cid,
      apprvrID,
      name,
      studentID,
      clrID
    );

    await ClearanceLog.logClearable(cid, new Date().toISOString());
    return { message: "Successfully applied!", success: true };
  } catch (e) {
    return { message: "Failed to apply", error: e.message };
  }

  // input cid then get clrID, name, studentID,
  // todo : add to clearance queue of specific approver
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
    return { message: "Failed retrieving", error: e, success: false };
  }

  // todo : create rows of clerance elements  in clearanc etable
};
const approverRegister = async (id, passwd) => {
  return await Approver.registerApprover(id, passwd);
  // what happens is basically you set your password
};
const approverUpdatePassword = async (id, passwd) => {
  return await Approver.updatePassword(id, passwd);
  //
};

const approverSignClearanceWithRemarks = async (CID, remarks) => {
  try {
    await ClearanceQueue.updateClearableStatus(CID, "Signed");
    await ClearanceQueue.updateClearableRemarks(CID, remarks);
    await ClearanceLog.logClearable(CID, new Date().toISOString());
    await ClearanceQueue.deleteClearable(CID);
    await Clearance.updateClearableRemarks(CID, remarks);
    await Clearance.updateClearableStatus(CID, "Signed");

    return { message: "Success", success: true };
  } catch (e) {
    return { message: "Failed.", error: e, success: false };
  }
};
const approverSignClearance = async (CID) => {
  try {
    await ClearanceQueue.updateClearableStatus(CID, "Signed");
    await ClearanceLog.logClearable(CID, new Date().toISOString());
    await ClearanceQueue.deleteClearable(CID);
    await Clearance.updateClearableStatus(CID, "Signed");

    return { message: "Success", success: true };
  } catch (e) {
    return { message: "Failed.", error: e, success: false };
  }
  //
};

const approverAddNoteToClearable = async (CID, note) => {
  return ClearanceQueue.updateClearableNote(CID, note);
};

const approverRejectClearance = async (CID, remarks) => {
  try {
    await ClearanceQueue.updateClearableStatus(CID, "Rejected");
    await ClearanceQueue.updateClearableRemarks(CID, remarks);
    await ClearanceLog.logClearable(CID, new Date().toISOString());
    await ClearanceQueue.deleteClearable(CID);
    await Clearance.updateClearableRemarks(CID, remarks);
    await Clearance.updateClearableStatus(CID, "Rejected");

    return { message: "Success", success: true };
  } catch (e) {
    return { message: "Failed.", error: e, success: false };
  }

  // remarrrks can't be null
  // update clearance queue to rejected and add remarks
  // remove from clearance queue
  // addt to top of clearance-log
  // update clearance of student
};

const fetchAllStudentsPublicInfo = async () => {
  return await Student.getAllStudents();
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

const fetchApproverInfo = async (id) => {
  return await Approver.getApproverPublicInfo(id);
};
const addClearanceConstraint = async () => {
  return await Clearance.addConstraint();
};

module.exports = {
  approverSignClearanceWithRemarks,
  approverSignClearance,
  approverAddNoteToClearable,
  approverRejectClearance,
  studentRegister,
  studentUpdatePassword,
  studentApplyClearable,
  fetchAllStudentsPublicInfo,
  fetchClearance,
  fetchApproverInfo,
  addClearanceConstraint,
  approverRegister,
  approverUpdatePassword,
  fetchAllClearances,
  fetchStudentInfo,
  isStudentRegistered,
  fetchClearanceTypeBasedOnCollegeID,
  populateClearanceForStudentID,
};
