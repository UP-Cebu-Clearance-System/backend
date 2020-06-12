const { db } = require("../../db");

function getClearableBasedOnCID(CID) {
  const query = "SELECT * from ClearanceQueue WHERE CID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [CID], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve(rows);
    });
  });
}

function getClearanceQueue(approverID) {
  const query = "SELECT * from ClearanceQueue WHERE ApproverID = ?";
  return new Promise(function (resolve, reject) {
    db.all(query, [approverID], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve(rows);
    });
  });
}

// function updateClearable(CID, note, status, remarks) {
//   var inp = [note, status, remarks, CID];
//   const query = `UPDATE ClearanceQueue SET ${note != null ? "Note = ?" : ""} ${
//     status != null ? "Status = ?" : ""
//   }, ${remarks != null ? "Remarks = ?" : " "} WHERE CID = ?`;

//   if (note == null) {
//   }
//   return new Promise(function (resolve, reject) {
//     db.all(query, inp, (err, rows) => {
//       if (err) resolve({message:"Failed", error: err, success:false});
//       else resolve({ message: "Successfully updated" , success:true});
//     });
//   });
// }

function updateClearableNote(CID, note) {
  const query = `UPDATE ClearanceQueue SET Note = ?  WHERE CID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, [note,   CID], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve({ message: "Successfully updated" , success:true});
    });
  });
}

function updateClearableStatus(CID, status) {
  const query = `UPDATE ClearanceQueue SET Status = ?  WHERE CID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, [  status,  CID], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve({ message: "Successfully updated" , success:true});
    });
  });
}

function updateClearableRemarks(CID, remarks) {
  const query = `UPDATE ClearanceQueue SET Remarks = ? WHERE CID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, [  remarks, CID], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve({ message: "Successfully updated" , success:true});
    });
  });
}
function deleteClearable(CID) {
  const query = "DELETE from ClearanceQueue WHERE CID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [CID], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve({ message: "Successfully deleted" , success:true});
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
        if (err) resolve({message:"Failed", error: err, success:false});
        else resolve({ message: "Successfully enqueued", success: true });
      }
    );
  });
}

module.exports = {
  getClearableBasedOnCID,
  getClearanceQueue, 
  deleteClearable,
  enqueueClearable,
  updateClearableNote,
  updateClearableStatus,
  updateClearableRemarks,
};
