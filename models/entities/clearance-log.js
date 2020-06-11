const { db } = require("../../db");

function getClearableOnLogBasedOnID(ID) {
  const query = "SELECT * from ClearanceLog WHERE ID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [ID], (err, rows) => {
      if (err) resolve(err);
      else resolve(rows);
    });
  });
}

function getClearanceLog(approverID) {
  const query = "SELECT * from ClearanceLog WHERE ApproverID = ?";
  return new Promise(function (resolve, reject) {
    db.all(query, [approverID], (err, rows) => {
      if (err) resolve(err);
      else resolve(rows);
    });
  });
}

// function updateClearable(CID, note, status, remarks) {
//   const query = `UPDATE ClearanceLog SET Note = ? Status = ?, Remarks = ? WHERE CID = ?`;
//   return new Promise(function (resolve, reject) {
//     db.all(query, [note, status, remarks, CID], (err, rows) => {
//       if (err) reject(err);
//       else resolve({ message: "Successfully updated" });
//     });
//   });
// }

function deleteClearable(ID) {
  const query = "DELETE from ClearanceLog WHERE ID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [ID], (err, rows) => {
      if (err) resolve(err);
      else resolve({ message: "Successfully deleted" });
    });
  });
}

function logClearable(
  cid,
  approverID,
  studentName,
  studentID,
  clearanceID,
  note,
  status,
  remarks,
  timestamp
) {
  const query = `INSERT INTO ClearanceLog (ID, CID, ApproverID, StudentName, StudentID, ClearanceID, Note, Status, Remarks, Timestamp) Values(?,?,?,?,?,?,?,?,?,?)`;
  return new Promise(function (resolve, reject) {
    db.all(
      query,
      [
        null,
        cid,
        approverID,
        studentName,
        studentID,
        clearanceID,
        note,
        status,
        remarks,
        timestamp,
      ],
      (err, rows) => {
        if (err) resolve(err);
        else resolve({ message: "Successfully logged", success: true });
      }
    );
  });
}

module.exports = {
  getClearableOnLogBasedOnID,
  getClearanceLog,
  deleteClearable,
  logClearable,
};
