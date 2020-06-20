const Admin = require("./tables/admin");

const Approver = require("./tables/approver");
const adminRegister = async (uname, passwd) => {
  return Admin.createAdmin(uname, passwd);
  // todo update password
};

const adminAddApprover = async (name, title, officeID, passwd) => {
  return Approver.createApprover(name, title, officeID, passwd);
};

const adminApproverUpdatePassword = async (id, passwd) => {
  return Approver.updatePassword(id, passwd);
};

const adminAddApproverTitle = async (name) => {};
const adminRemoveApprover = async (id) => {};
const adminAddClearanceFlow = async (id, passwd) => {};

module.exports = {
  adminRegister,
  adminAddApprover,
  adminRemoveApprover,
  adminAddApproverTitle,
  adminAddClearanceFlow,
  adminApproverUpdatePassword,
};
