const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const admin_layout = "../views/layout/admin";

router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog page created with Node.js and MongoDB",
    };
    res.render("admin/index", { locals, layout: admin_layout });
  } catch (error) {
    console.log(error);
  }
});

router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
