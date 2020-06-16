const { db } = require("../../db");

function getClearanceFlow(id) {
  const query = "SELECT * from ClearanceFlow WHERE ClearanceFlowID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve(rows);
    });
  });
}

function getAllClearanceFlows() {
  const query = "SELECT * from ClearanceFlow";
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve(rows);
    });
  });
}

function createClearanceFlow(clearanceTypeID, approverID, flow) {
  const query = `INSERT INTO ClearanceFlow (ClearanceTypeID, ApproverID, Flow) Values(?, ?, ?)`;
  return new Promise(function (resolve, reject) {
    db.all(query, [clearanceTypeID, approverID, flow], (err, rows) => {
      if (err)  resolve({message:"Failed", error: err, success:false});
      else resolve({ message: "Successfully created" });
    });
  });
}

function updateClearanceFlow(params) {
  /** Must give the whole ClearanceFlow row in exact Flow */
  const query = `UPDATE ClearanceFlow SET ClearanceTypeID = ?, ApproverID = ?, Flow = ? WHERE ClearanceFlowID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, params, (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve({ message: "Successfully updated" , success:true});
    });
  });
}
function deleteClearanceFlow(id) {
  const query = "DELETE from ClearanceFlow WHERE ClearanceFlowID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [id], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve({ message: "Successfully deleted" , success:true});
    });
  });
}
 

module.exports = {
  getClearanceFlow,
  getAllClearanceFlows,
  createClearanceFlow,
  updateClearanceFlow,
  deleteClearanceFlow,
};
