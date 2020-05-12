const { db } = require("../../db");

function getOffice(id) {
  const query = "SELECT * from Office WHERE OfficeID = ?";
  return new Promise(function (resolve, reject) {
    db.get(query, [id], (err, rows) => {
      if (err) resolve(err);
      else resolve(rows);
    });
  });
}

function getAllOffices() {
  const query = "SELECT * from Office";
  return new Promise(function (resolve, reject) {
    db.all(query, [], (err, rows) => {
      if (err) resolve(err);
      else resolve(rows);
    });
  });
}

function createOffice(id, name) {
  const query = `INSERT INTO Office Values(?,?)`;
  return new Promise(function (resolve, reject) {
    db.all(query, [id, name], (err, rows) => {
      if (err) resolve(err);
      else resolve({ message: "Successfully created" });
    });
  });
}

function updateOffice(params) {
  /** Must give the whole Office row in exact order */
  const query = `UPDATE Office SET Name = ? WHERE OfficeID = ?`;
  return new Promise(function (resolve, reject) {
    db.all(query, params, (err, rows) => {
      if (err) resolve(err);
      else resolve({ message: "Successfully updated" });
    });
  });
}
function deleteOffice(id) {
  const query = "DELETE from Office WHERE OfficeID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [id], (err, rows) => {
      if (err) resolve(err);
      else resolve({ message: "Successfully deleted" });
    });
  });
}

module.exports = {
  getOffice,
  getAllOffices,
  createOffice,
  updateOffice,
  deleteOffice,
};
