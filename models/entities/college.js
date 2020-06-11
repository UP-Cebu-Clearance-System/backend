const { db } = require("../../db");

function getCollege(id) {
  const query = "SELECT * from College WHERE CollegeID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve(rows);
    });
  });
}

function getAllColleges() {
  const query = "SELECT * from College";
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve(rows);
    });
  });
}

function createCollege(id, name) {
  const query = `INSERT INTO College Values(?,?)`;
  return new Promise(function (resolve, reject) {
    db.all(query, [id, name], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve({ message: "Successfully created" });
    });
  });
}

function updateCollege(params) {
  /** Must give the whole College row in exact order */
  const query = `UPDATE College SET Name = ? WHERE CollegeID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, params, (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve({ message: "Successfully updated" , success:true});
    });
  });
}
function deleteCollege(id) {
  const query = "DELETE from College WHERE CollegeID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [id], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve({ message: "Successfully deleted" , success:true});
    });
  });
}

module.exports = {
  getCollege,
  getAllColleges,
  createCollege,
  updateCollege,
  deleteCollege,
};
