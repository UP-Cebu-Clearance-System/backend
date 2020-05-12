const test = require("express").Router();
const Admin = require("../models/entities/admin");

test.get("/", async (req, res) => {
  res.send(await Admin.getAllAdmins());
});
test.get("/getOne", async (req, res) => {
  res.send(await Admin.getAdmin("testUsername"));
});
test.get("/create", async (req, res) => {
  result = await Admin.createAdmin("testUsername", "test Password");
  console.log(result);
  res.send(result);
});

test.get("/update", async (req, res) => {
  res.send(await Admin.updateAdmin(["updated test Password", "testUsername"]));
});

test.get("/delete", async (req, res) => {
  res.send(await Admin.deleteAdmin("testUsername"));
});

module.exports = { test };
