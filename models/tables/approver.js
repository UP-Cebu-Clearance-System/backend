const { db } = require("../../db");

function getApprover(id) {
  const query = "SELECT * from Approver WHERE ApproverID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}

function getApproverPublicInfo(id) {
  const query =
    "SELECT ApproverID, Name, Title from Approver WHERE ApproverID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}

function getAllApprovers() {
  const query = "SELECT * from Approver";
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}

function createApprover(id, name, employeeID, title, officeID, password) {
  const query = `INSERT INTO Approver Values(?,?,?,?,?,?)`;
  return new Promise(function (resolve, reject) {
    db.all(
      query,
      [id, name, employeeID, title, officeID, password],
      (err, rows) => {
        if (err) resolve({ message: "Failed", error: err, success: false });
        else resolve({ message: "Successfully created" });
      }
    );
  });
}

function updateApprover(params) {
  /** Must give the whole Approver row in exact order */
  const query = `UPDATE Approver SET Name = ?, EmployeeID = ?, Title = ?, OfficeID = ?, Password = ?  WHERE ApproverID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, params, (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully updated", success: true });
    });
  });
}

function updateApproverName(approverID, name) {
  /** Must give the whole Approver row in exact order */
  const query = `UPDATE Approver SET Name = ?  WHERE ApproverID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, [name, approverID], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully updated", success: true });
    });
  });
}

function updateApproverOfficeID(approverID, officeID) {
  /** Must give the whole Approver row in exact order */
  const query = `UPDATE Approver SET OfficeID = ?  WHERE ApproverID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, [officeID, approverID], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully updated", success: true });
    });
  });
}
function updateApproverTitle(approverID, title) {
  /** Must give the whole Approver row in exact order */
  const query = `UPDATE Approver SET Title = ?  WHERE ApproverID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, [title, approverID], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully updated", success: true });
    });
  });
}
function updatePassword(id, passwd) {
  const query = `UPDATE Approver SET Password = ? WHERE ApproverID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, [passwd, id], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully updated", success: true });
    });
  });
}

function registerApprover(id, passwd) {
  const query = `UPDATE Approver SET Password = ? WHERE ApproverID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, [passwd, id], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully updated", success: true });
    });
  });
}
function deleteApprover(id) {
  const query = "DELETE from Approver WHERE ApproverID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [id], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully deleted", success: true });
    });
  });
}

module.exports = {
  getApprover,
  getAllApprovers,
  getApproverPublicInfo,
  createApprover,
  updateApprover,
  deleteApprover,
  updatePassword,
  registerApprover,
  updateApproverName,
  updateApproverOfficeID,
  updateApproverTitle,
};
