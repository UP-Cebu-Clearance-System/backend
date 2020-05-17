const { db } = require("../../db");

function getClearanceBasedOnPriority(pID) {
  const query = "SELECT * from ClearanceQueue WHERE PriorityID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [pID], (err, rows) => {
      if (err) resolve(err);
      else resolve(rows);
    });
  });
}

function getClearanceQueue() {
  const query = "SELECT * from ClearanceQueue";
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) resolve(err);
      else resolve(rows);
    });
  });
}

function addClearanceToQueue(CID) {
  const query = `INSERT INTO ClearanceQueue (CID) Values(?,)`;
  return new Promise(function (resolve, reject) {
    db.all(query, [CID], (err, rows) => {
      if (err) resolve(err);
      else resolve({ message: "Successfully created" });
    });
  });
}

function updateClearanceQueue(params) {
  /** Must give the whole ClearanceQueue row in exact Queue */
  const query = `UPDATE ClearanceQueue SET CID = ?, ClearanceID = ?, Note = ? WHERE PriorityID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve({ message: "Successfully updated" });
    });
  });
}
function addNoteToClearanceBasedOnCID(note) {
  const query = `UPDATE ClearanceQueue SET Note = ? WHERE CID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve({ message: "Successfully updated" });
    });
  });
}

function deleteClearanceQueue(id) {
  const query = "DELETE from ClearanceQueue WHERE PriorityID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [id], (err, rows) => {
      if (err) resolve(err);
      else resolve({ message: "Successfully deleted" });
    });
  });
}

module.exports = {
  getClearanceQueue,
  addClearanceToQueue,
  getAllClearanceQueues,
  addNoteToClearanceBasedOnCID,
  createClearanceQueue, 
  deleteClearanceQueue,
  getClearanceBasedOnPriority,
};
