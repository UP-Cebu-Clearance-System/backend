const { db } = require("../../db");

function getClearableOnLogBasedOnID(ID) {
  const query = "SELECT * from ClearanceLog WHERE ID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [ID], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}

function getClearanceLog(approverID) {
  const query = "SELECT * from ClearanceLog WHERE ApproverID = ? ORDER BY ID DESC";
  return new Promise(function (resolve, reject) {
    db.all(query, [approverID], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}

// function updateClearable(CID, note, status, remarks) {
//   const query = `UPDATE ClearanceLog SET Note = ? Status = ?, Remarks = ? WHERE CID = ?`;
//   return new Promise(function (resolve, reject) {
//     db.all(query, [note, status, remarks, CID], (err, rows) => {
//       if (err) resolve({message:"Failed", error: err, success:false});
//       else resolve({ message: "Successfully updated" , success:true});
//     });
//   });
// }

function deleteClearable(ID) {
  const query = "DELETE from ClearanceLog WHERE ID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [ID], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully deleted", success: true });
    });
  });
}
 

function logClearable(cid, timestamp) {
  const query = `INSERT INTO ClearanceLog (ID, CID, ApproverID, StudentName, StudentID, ClearanceID, Note, Status, Remarks,Timestamp) select NULL as ID, CID, ApproverID, StudentName, StudentID, ClearanceID, Note, Status, Remarks, ? from ClearanceQueue where CID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, [timestamp, cid], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully logged", success: true });
    });
  });
}

module.exports = {
  getClearableOnLogBasedOnID,
  getClearanceLog,
  deleteClearable,
  logClearable,
};
