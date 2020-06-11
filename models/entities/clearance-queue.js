const { db } = require("../../db");

function getClearableBasedOnCID(CID) {
  const query = "SELECT * from ClearanceQueue WHERE CID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [CID], (err, rows) => {
      if (err) resolve(err);
      else resolve(rows);
    });
  });
}

function getClearanceQueue(approverID) {
  const query = "SELECT * from ClearanceQueue WHERE ApproverID = ?";
  return new Promise(function (resolve, reject) {
    db.all(query, [approverID], (err, rows) => {
      if (err) resolve(err);
      else resolve(rows);
    });
  });
}

function updateClearable(CID, note, status, remarks) {
  const query = `UPDATE ClearanceQueue SET Note = ? Status = ?, Remarks = ? WHERE CID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, [note, status, remarks, CID], (err, rows) => {
      if (err) reject(err);
      else resolve({ message: "Successfully updated" });
    });
  });
}

function deleteClearable(CID) {
  const query = "DELETE from ClearanceQueue WHERE CID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [CID], (err, rows) => {
      if (err) resolve(err);
      else resolve({ message: "Successfully deleted" });
    });
  });
}

function enqueueClearable(cid, approverID, name, studentID, clearanceID) {
  const query = `INSERT INTO ClearanceQueue (CID, ApproverID, StudentName, StudentID, ClearanceID, Note, Status, Remarks) Values(?,?,?,?,?,?,?,?)`;
  return new Promise(function (resolve, reject) {
    db.all(
      query,
      [cid, approverID, name, studentID, clearanceID, null, null, null],
      (err, rows) => {
        if (err) resolve(err);
        else resolve({ message: "Successfully enqueued", success: true });
      }
    );
  });
}

module.exports = {
  getClearableBasedOnCID,
  getClearanceQueue,
  updateClearable,
  deleteClearable,
  enqueueClearable,
};
