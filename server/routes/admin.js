const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_KEY;
const adminMiddleWare = require("../middlewares/admin");

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
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

router.get("/dashboard", adminMiddleWare, async (req, res) => {
  try {
    const locals = {
      title: "Dashboard",
      description: "Blog created with NodeJs, Express & MongoDB",
    };

    const data = await Post.find();
    res.render("admin/dashboard", {
      locals,
      data,
      layout: admin_layout,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/add-post", adminMiddleWare, async (req, res) => {
  try {
    const locals = {
      title: "Add Post",
      description: "Blog created with NodeJs, Express & MongoDB",
    };

    const data = await Post.find();
    res.render("admin/add-post", {
      locals,
      layout: admin_layout,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-post", adminMiddleWare, async (req, res) => {
  try {
    console.log(req.body);
    try {
      const newPost = await Post.create({
        title: req.body.title,
        body: req.body.body,
      });
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

// router.post("/admin", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       username: username,
//       password: hashedPassword,
//     });
//     res.status(201).json({
//       user,
//     });
//   } catch (error) {
//     if (error.code === 11000) {
//       res.status(409).json({ message: "User already in use" });
//     }
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

module.exports = router;
