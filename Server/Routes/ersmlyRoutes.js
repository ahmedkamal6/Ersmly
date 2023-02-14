const express = require("express");
const env = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

env.config();
const router = express.Router();
const config = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(config);

router.route("/").get((req, res) => {
  res.send("Hello from ersmly");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiRes = openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });
    const image = (await aiRes).data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    res.status(500).send(error?.response.data.error.message);
  }
});

module.exports = router;
