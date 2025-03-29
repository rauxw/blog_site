const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Routes

// Route for GET => HOME

router.get("", async function (req, res) {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog site",
    };

    let perPage = 6;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
  }
});

function insertPostData() {
  Post.insertMany([
    {
      title: "Just a another test",
      body: "This is just a body",
    },
  ]);
}

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
