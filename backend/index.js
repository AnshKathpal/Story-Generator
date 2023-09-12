const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors")
const storyRoute = require("./routes/story")

require("dotenv").config();
app.use(express.json());

app.use(cors());
app.use("/user", storyRoute);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error.message);
  }
};


const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  connect();
  console.log(process.env.PORT)
  console.log(`Server is listening on port ${process.env.PORT}`);
});
