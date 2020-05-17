const { db } = require("../../db");

function getClearance(id) {
  const query = "SELECT * from Clearance WHERE ClearanceID = ?";
  return new Promise(function (resolve, reject) {
    db.all(query, [id], (err, rows) => {
      if (err) resolve(err);
      else resolve(rows);
    });
  });
}

function getAllClearances() {
  const query = "SELECT * from Clearance";
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) resolve(err);
      else resolve(rows);
    });
  });
}

function createClearance(
  clearanceID,
  clearanceTypeID,
  approverID,
  flow,
  status,
  remarks
) {
  const query = `INSERT INTO Clearance Values(?,?,?,?,?,?)`;
  return new Promise(function (resolve, reject) {
    db.all(
      query,
      [clearanceID, clearanceTypeID, approverID, flow, status, remarks],
      (err, rows) => {
        if (err) resolve(err);
        else resolve({ message: "Successfully created" });
      }
    );
  });
}

function updateClearance(params) {
  /** Must give the whole Clearance row in exact  */
  const query = `UPDATE Clearance SET ClearanceTypeID = ?, ApproverID = ?,Flow  = ?, Status = ?, Remarks =? WHERE ClearanceID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve({ message: "Successfully updated" });
    });
  });
}

function deleteClearance(id) {
  const query = "DELETE from Clearance WHERE ClearanceID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [id], (err, rows) => {
      if (err) resolve(err);
      else resolve({ message: "Successfully deleted" });
    });
  });
}

module.exports = {
  getClearance,
  getAllClearances,
  createClearance,
  updateClearance,
  deleteClearance,
};
