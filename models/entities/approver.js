const { db } = require("../../db");

function getApprover(id) {
  const query = "SELECT * from Approver WHERE ApproverID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) resolve(err);
      else resolve(rows);
    });
  });
}

function getAllApprovers() {
  const query = "SELECT * from Approver";
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) resolve(err);
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
        if (err) resolve(err);
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
      if (err) resolve(err);
      else resolve({ message: "Successfully updated" });
    });
  });
}
function deleteApprover(id) {
  const query = "DELETE from Approver WHERE ApproverID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [id], (err, rows) => {
      if (err) resolve(err);
      else resolve({ message: "Successfully deleted" });
    });
  });
}

module.exports = {
  getApprover,
  getAllApprovers,
  createApprover,
  updateApprover,
  deleteApprover,
};
