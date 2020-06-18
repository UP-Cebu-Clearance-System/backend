const { db } = require("../../db");

function getAdmin(id) {
  const query = "SELECT * from Admin WHERE Username = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve(rows);
    });
  });
}

function getAllAdmins() {
  const query = "SELECT * from Admin";
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve(rows);
    });
  });
}

function createAdmin(username, password) {
  const query = `INSERT INTO Admin Values(?,?)`;
  return new Promise(function (resolve, reject) {
    db.all(query, [username, password], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve({ message: "Successfully created", success:true });
    });
  });
}

function updateAdmin(params) {
  /** Must give the whole Admin row in exact order */
  const query = `UPDATE Admin SET Password = ? WHERE Username = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, params, (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve({ message: "Successfully updated" , success:true});
    });
  });
}
function deleteAdmin(id) {
  const query = "DELETE from Admin WHERE Username = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [id], (err, rows) => {
      if (err) resolve({message:"Failed", error: err, success:false});
      else resolve({ message: "Successfully deleted" , success:true});
    });
  });
}

module.exports = {
  getAdmin,
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
