const express = require("express");
const env = require("dotenv");
const cloudinary = require("cloudinary").v2;
const OpenAi = require("openai");
const Post = require("../mongoDB/models/post");

env.config();
const router = express.Router();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

//get all posts
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});
//create a post
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoURL = await cloudinary.uploader.upload(photo);
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoURL.url,
    });
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});
module.exports = router;
