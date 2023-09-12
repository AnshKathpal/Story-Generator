const express = require("express");
const story = express.Router();
const storyModel = require("../model/storyModel")
const axios = require("axios");

require("dotenv").config();
const apiKey = process.env.MY_OPENAI_API;
const openaiEndpoint = "https://api.openai.com/v1/engines/text-davinci-003/completions";

story.post("/story", async (req, res) => {
  const {keyword} = req.body;


  const maxChar = 500;

  try {

    const response = await axios.post(
      openaiEndpoint,
      {
        prompt: `Write a story about ${keyword}.`,
        max_tokens: maxChar,
        temperature: 0,
        n: 1
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = response.data.choices[0].text;

    const newConversation = new storyModel({
        keyword: keyword,
        generatedStory: aiResponse,
    });

    await newConversation.save();
    res.send(aiResponse);
  } catch (error) {
    console.error("Error saving conversation:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = story;
