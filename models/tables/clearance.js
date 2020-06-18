const { db } = require("../../db");

function getClearance(id) {
  const query = "SELECT * from Clearance WHERE ClearanceID = ? ORDER BY Flow";
  return new Promise(function (resolve, reject) {
    db.all(query, [id], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}

function getClearanceInfoFromCID(cid) {
  const query = "SELECT * from Clearance WHERE CID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [cid], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}

function getAllClearances() {
  const query = "SELECT * from Clearance";
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}

function populateClearanceBasedOnClearanceIDandClearanceTypeID(
  clearanceID,
  clearanceTypeID
) {
  const query = `INSERT INTO Clearance (CID, ClearanceID, ClearanceTypeID, ApproverID, Flow, Status, Remarks) 
  select * from (SELECT NULL as CID,case when 1 then ? end as ClearanceID ,  ClearanceFlow.ClearanceTypeID as ClearanceTypeID,
   ClearanceFlow.ApproverID as ApproverID, ClearanceFlow.Flow as Flow, NULL as Status,NULL as Remarks  FROM
   (select * from ClearanceFlow where ClearanceFlow.ClearanceTypeID == ?)  as ClearanceFlow)`;
  return new Promise(function (resolve, reject) {
    db.all(query, [clearanceID, clearanceTypeID], (err, rows) => {
      if (err) {
        resolve({ message: "failed", success: false, error: err });
      } else resolve({ message: "Successfully created", success: true });
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
        if (err) resolve({ message: "Failed", error: err, success: false });
        else resolve({ message: "Successfully created" });
      }
    );
  });
}

function addConstraint() {
  /** Must give the whole Clearance row in exact  */
  const query = `ALTER TABLE Clearance ADD CONSTRAINT unique_mul UNIQUE (ClearanceID, ClearanceTypeID, ApproverID, Flow)`;
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully updated", success: true });
    });
  });
}

// function updateClearance(params) {
//   /** Must give the whole Clearance row in exact  */
//   const query = `UPDATE Clearance SET ClearanceTypeID = ?, ApproverID = ?,Flow  = ?, Status = ?, Remarks =? WHERE ClearanceID = ?`;
//   return new Promise(function (resolve, reject) {
//     db.all(query, params, (err, rows) => {
//       if (err) resolve({message:"Failed", error: err, success:false});
//       else resolve({ message: "Successfully updated" , success:true});
//     });
//   });
// }
function updateClearableStatus(cid, status) {
  /** Must give the whole Clearance row in exact  */
  const query = `UPDATE Clearance SET Status = ? WHERE CID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, [status, cid], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully updated status" });
    });
  });
}
function updateClearable(cid, status, remarks) {
  /** Must give the whole Clearance row in exact  */
  const query = `UPDATE Clearance SET Status = ?, Remarks = ? WHERE CID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, [status, remarks, cid], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully updated status" });
    });
  });
}
function updateClearableRemarks(cid, remarks) {
  /** Must give the whole Clearance row in exact  */
  const query = `UPDATE Clearance SET Remarks = ? WHERE CID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, [remarks, cid], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully updated remarks" });
    });
  });
}

function deleteClearance(id) {
  const query = "DELETE from Clearance WHERE ClearanceID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [id], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully deleted", success: true });
    });
  });
}

module.exports = {
  updateClearableRemarks,
  updateClearableStatus,
  getClearance,
  getAllClearances,
  addConstraint,
  getClearanceInfoFromCID,
  populateClearanceBasedOnClearanceIDandClearanceTypeID,
  createClearance,
  // updateClearance,
  deleteClearance,
  updateClearable,
};
