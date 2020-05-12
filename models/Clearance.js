const Student = require("./entities/student");

const getAllStudents = async () => {
  return await Student.getAllStudents();
};

const registerStudent = async (id, name, clearanceID, collegeID, password) => {
  return await Student.createStudent(
    id,
    name,
    clearanceID,
    collegeID,
    password
  );
};

module.exports = { getAllStudents, registerStudent };
