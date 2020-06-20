const { db } = require("../../db");

function addApproverTitle(name) {
  const query = "INSERT INTO ApproverTitles(TitleID, Name) values(?, ?)";
  return new Promise(function (resolve, reject) {
    db.run(
      query,
      [name.trim().toLowercase().replace(/ /g, "-"), name],
      (err, rows) => {
        if (err) resolve({ message: "Failed", error: err, success: false });
        else resolve({ message: "Successfully added Title", success: true });
      }
    );
  });
}

function deleteApproverTitle(id) {
  const query = "DELETE from ApproverTitles WHERE TitleID = ?";
  return new Promise(function (resolve, reject) {
    db.run(query, [id], (err, rows) => {
      if (err) resolve({ message: "Failed", error: err, success: false });
      else resolve({ message: "Successfully deleted", success: true });
    });
  });
}
module.exports = {
  addApproverTitle,
  deleteApproverTitle,
};
