const { db } = require("../../db");

function getClearanceType(id) {
  const query = "SELECT * from ClearanceType WHERE ClearanceTypeID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve(rows);
    });
  });
}

function getClearanceTypeIDBasedOnCollegeID(id) {
  const query = "SELECT ClearanceTypeID from ClearanceType WHERE CollegeID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve(rows);
    });
  });
}



function getAllClearanceTypes() {
  const query = "SELECT * from ClearanceType";
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve(rows);
    });
  });
}

function createClearanceType(id, collegeID) {
  const query = `INSERT INTO ClearanceType Values(?,?)`;
  return new Promise(function (resolve, reject) {
    db.all(query, [id, collegeID], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve({ message: "Successfully created" });
    });
  });
}

function updateClearanceType(params) {
  /** Must give the whole ClearanceType row in exact order */
  const query = `UPDATE ClearanceType SET CollegeID = ? WHERE ClearanceTypeID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, params, (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve({ message: "Successfully updated" , success:true});
    });
  });
}
function deleteClearanceType(id) {
  const query = "DELETE from ClearanceType WHERE ClearanceTypeID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [id], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve({ message: "Successfully deleted" , success:true});
    });
  });
}

module.exports = {
  getClearanceType,
  getAllClearanceTypes,
  createClearanceType,
  updateClearanceType,
  deleteClearanceType,
  getClearanceTypeIDBasedOnCollegeID
};
