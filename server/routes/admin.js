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
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      password: hashedPassword,
    });
    res.status(201).json({
      user,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "User already in use" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
