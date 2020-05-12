const { db } = require("../../db");

function getStudent(id) {
  const query = "SELECT * from Student WHERE StudentID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) resolve(err);
      else resolve(rows);
    });
  });
}

function getAllStudents() {
  const query = "SELECT * from Student";
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) resolve(err);
      else resolve(rows);
    });
  });
}

function createStudent(id, name, clearanceID, collegeID, password) {
  const query = `INSERT INTO Student Values(?,?,?,?,?,?)`;
  return new Promise(function (resolve, reject) {
    db.all(
      query,
      [id, name, clearanceID, "notapplied", collegeID, password],
      (err, rows) => {
        if (err) resolve(err);
        else resolve({ message: "Successfully created" });
      }
    );
  });
}

function updateStudent(params) {
  /** Must give the whole student row in exact order */
  const query = `UPDATE Student SET Name = ?, ClearanceID = ?, Status = ?, CollegeID = ?, Password = ?  WHERE StudentID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, params, (err, rows) => {
      if (err) resolve(err);
      else resolve({ message: "Successfully updated" });
    });
  });
}
function deleteStudent(id) {
  const query = "DELETE from Student WHERE StudentID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [id], (err, rows) => {
      if (err) resolve(err);
      else resolve({ message: "Successfully deleted" });
    });
  });
}

module.exports = {
  getStudent,
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};
