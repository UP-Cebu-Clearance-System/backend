const { db } = require("../../db");

function getStudent(id) {
  const query = "SELECT * from Student WHERE StudentID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getAllStudents(id) {
  const query = "SELECT * from Student";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function createStudent(id, name, clearanceID, collegeID, password) {
  const query = `INSERT INTO Student
Values(?,?,?,?,?,?)`;
  return new Promise(function (resolve, reject) {
    db.run(
      query,
      [id, name, clearanceID, "notapplied", collegeID, password],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

function updateStudent(params = []) {
  /** Must give the whole student row in exact order */
  const query = `UPDATE Name = ?, ClearanceID = ?, Status = ?, CollegeID = ?, Password = ?  WHERE StudentID = ?`;
  return new Promise(function (resolve, reject) {
    db.run(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
function deleteStudent(id) {
  const query = "DELETE from Student WHERE StudentID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
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
