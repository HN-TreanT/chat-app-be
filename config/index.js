const mongoose = require("mongoose");
require("dotenv").config();
async function connect() {
  try {
    // await mongoose.connect("mongodb://localhost:27017/chat-app");
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("connect succeeded");
  } catch (e) {
    console.log("connect fail");
  }
}

module.exports = { connect };
