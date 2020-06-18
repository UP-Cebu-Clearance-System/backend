const { db } = require("../../db");

function getStudent(id) {
  const query = "SELECT * from Student WHERE StudentID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}

function getStudentPublicInfo(id) {
  const query =
    "SELECT StudentID, Name, ClearanceID, Status, CollegeID  from Student WHERE StudentID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}
function getStudentInfoFromClearanceID(clearanceID) {
  const query =
    "SELECT StudentID, Name, CollegeID  from Student WHERE ClearanceID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [clearanceID], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}

function getStudentCollegeID(id) {
  const query = "SELECT CollegeID from Student WHERE StudentID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}
function getStudentClearanceID(id) {
  const query = "SELECT ClearanceID from Student WHERE StudentID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}
function getAllStudents() {
  const query =
    "SELECT StudentID, Name, ClearanceID, Status, CollegeID from Student";
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve(rows);
    });
  });
}

function createStudent(id, name, clearanceID, collegeID, password) {
  const query = `INSERT INTO Student(StudentID, Name, ClearanceID,CollegeID,Password) Values(?,?,?,?,?)`;
  return new Promise(function (resolve, reject) {
    db.all(query, [id, name, clearanceID, collegeID, password], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully created", success: true });
    });
  });
}

function updatePassword(id, passwd) {
  const query = `UPDATE Student SET Password = ?  WHERE StudentID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, [passwd, id], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully updated", success: true });
    });
  });
}

function updateStudent(params) {
  /** Must give the whole student row in exact order */
  const query = `UPDATE Student SET Name = ?, ClearanceID = ?, Status = ?, CollegeID = ?, Password = ?  WHERE StudentID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, params, (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully updated", success: true });
    });
  });
}
function deleteStudent(id) {
  const query = "DELETE from Student WHERE StudentID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [id], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully deleted", success: true });
    });
  });
}

module.exports = {
  getStudent,
  getStudentInfoFromClearanceID,
  updatePassword,
  getAllStudents,
  getStudentCollegeID,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentClearanceID,
  getStudentPublicInfo,
};
