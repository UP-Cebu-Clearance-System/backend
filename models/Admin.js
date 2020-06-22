const Admin = require("./tables/admin");

const Approver = require("./tables/approver");
const ApproverTitles = require("./tables/approver-titles");
const ClearanceFlow = require("./tables/clearance-flow");
const adminRegister = async (uname, passwd) => {
  return Admin.createAdmin(uname, passwd);
  // todo update password
};

const adminAddApprover = async (name, title, officeID, passwd) => {
  return Approver.createApprover(name, title, officeID, passwd);
};

const adminApproverUpdatePassword = async (id, passwd) => {
  return Approver.updatePassword(id, passwd);
};

const adminAddApproverTitle = async (name) => {
  return ApproverTitles.addApproverTitle(name);
};
const adminRemoveApproverTitle = async (id) => {
  return ApproverTitles.adminRemoveApproverTitle(id);
};
const adminRemoveApprover = async (id) => {
  return Approver.deleteApprover(id);
};
const adminAddClearanceFlow = async (id, passwd) => {};

const adminFetchClearanceFlowOfClearanceTypeID = async (clearanceTypeID) => {
  return ClearanceFlow.getClearanceFlowFromClearanceTypeID(clearanceTypeID);
};

const adminAddClearableToClearanceFlow = async (
  clearanceTypeID,
  approverID,
  flow
) => {
  return ClearanceFlow.addClearableToClearanceFlow(
    clearanceTypeID,
    approverID,
    flow
  );
};

const adminRemoveClearableFromClearanceFlow = async (clearanceFlowID) => {
  return ClearanceFlow.deleteClearableFromClearanceFlowID(clearanceFlowID);
};

const adminUpdateClearableApproverFromClearanceFlow = async (
  clearanceFlowID,
  approverID
) => {
  return ClearanceFlow.updateApproverIDOfClearableToClearanceFlow(
    clearanceFlowID,
    approverID
  );
};
const adminUpdateClearableFlowFromClearanceFlow = async (
  clearanceFlowID,
  flow
) => {
  return ClearanceFlow.updateFlowOfClearableToClearanceFlow(
    clearanceFlowID,
    flow
  );
};

const adminManualQuery = async (query) => {
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully queried", result: rows });
    });
  });
};

module.exports = {
  adminRegister,
  adminAddApprover,
  adminManualQuery,
  adminRemoveApprover,
  adminAddApproverTitle,
  adminAddClearanceFlow,
  adminRemoveApproverTitle,
  adminApproverUpdatePassword,

  adminAddClearableToClearanceFlow,
  adminRemoveClearableFromClearanceFlow,
  adminFetchClearanceFlowOfClearanceTypeID,
  adminUpdateClearableFlowFromClearanceFlow,
  adminUpdateClearableApproverFromClearanceFlow,
};
