const Student = require("./tables/student");
const Office = require("./tables/office");
const ClearanceType = require("./tables/clearance-type");
const College = require("./tables/college");
const Clearance = require("./tables/clearance");
const ClearanceQueue = require("./tables/clearance-queue");
const ClearanceLog = require("./tables/clearance-log");
const ClearanceFlow = require("./tables/clearance-flow");
const Approver = require("./tables/approver");
const Admin = require("./tables/admin");

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
    return { message: "Failed to apply", error: e.message, success: false };
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

    await Clearance.populateClearanceBasedOnClearanceIDandClearanceTypeID(
      clearanceID,
      clearanceTypeID
    );

    return { message: "Successfully populated!", success: true };
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

    return { message: "Successfully approved", success: true };
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

    return { message: "Successfully approved", success: true };
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

    return { message: "Successfully rejected", success: true };
  } catch (e) {
    return { message: "Failed.", error: e, success: false };
  }

  // remarrrks can't be null
  // update clearance queue to rejected and add remarks
  // remove from clearance queue
  // addt to top of clearance-log
  // update clearance of student
};
const approverRestoreClearable = async (id) => {
  try {
    await ClearanceLog.restoreClearable(id);
    var res = await ClearanceLog.getNoteStatusRemarksBasedOnID(id);
    console.log(res);
    await Clearance.updateClearable(res["CID"], res["Status"], res["Remarks"]);

    return { message: "Success", success: true };
  } catch (e) {
    return { message: "Failed.", error: e, success: false };
  }
};

const approverFetchClearanceQueue = async (approverID) => {
  return await ClearanceQueue.getClearanceQueue(approverID);
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
  approverFetchClearanceQueue,
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
  approverRestoreClearable,
};
