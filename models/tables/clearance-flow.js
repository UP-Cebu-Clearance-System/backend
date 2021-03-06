const { db } = require("../../db");

function getClearanceFlow(id) {
  const query = "SELECT * from ClearanceFlow WHERE ClearanceFlowID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}

function getClearanceFlowFromClearanceTypeID(clearanceTypeID) {
  const query = "SELECT * from ClearanceFlow WHERE ClearanceTypeID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [clearanceTypeID], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}
function addClearableToClearanceFlow(clearanceTypeID, approverID, flow) {
  const query = `INSERT INTO ClearanceFlow (ClearanceTypeID, ApproverID, Flow) Values(?, ?, ?) WHERE ClearanceTypeID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(
      query,
      [clearanceTypeID, approverID, flow, clearanceTypeID],
      (err, rows) => {
        if (err) resolve({ message: "Failed", error: err, success: false });
        else resolve({ message: "Successfully created" });
      }
    );
  });
}
function updateApproverIDOfClearableToClearanceFlow(
  clearanceFlowID,
  approverID
) {
  const query = `UPDATE ClearanceFlow SET ApproverID = ?  WHERE ClearanceFlowID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, [approverID, clearanceFlowID], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully updated approverID" });
    });
  });
}
function updateFlowOfClearableToClearanceFlow(clearanceFlowID, flow) {
  const query = `UPDATE ClearanceFlow SET Flow = ?  WHERE ClearanceFlowID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, [flow, clearanceFlowID], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully updated flow" });
    });
  });
}
function getAllClearanceFlows() {
  const query = "SELECT * from ClearanceFlow";
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}

function createClearanceFlow(clearanceTypeID, approverID, flow) {
  const query = `INSERT INTO ClearanceFlow (ClearanceTypeID, ApproverID, Flow) Values(?, ?, ?)`;
  return new Promise(function (resolve, reject) {
    db.all(query, [clearanceTypeID, approverID, flow], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully created" });
    });
  });
}

function updateClearanceFlow(params) {
  /** Must give the whole ClearanceFlow row in exact Flow */
  const query = `UPDATE ClearanceFlow SET ClearanceTypeID = ?, ApproverID = ?, Flow = ? WHERE ClearanceFlowID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, params, (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully updated", success: true });
    });
  });
}
function deleteClearableFromClearanceFlowID(id) {
  const query = "DELETE from ClearanceFlow WHERE ClearanceFlowID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [id], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully deleted", success: true });
    });
  });
}

module.exports = {
  getClearanceFlow,
  getAllClearanceFlows,
  createClearanceFlow,
  updateClearanceFlow,
  addClearableToClearanceFlow,
  deleteClearableFromClearanceFlowID,
  getClearanceFlowFromClearanceTypeID,
  updateFlowOfClearableToClearanceFlow,
  updateApproverIDOfClearableToClearanceFlow,
};
