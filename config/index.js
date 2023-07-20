const mongoose = require("mongoose");
require("dotenv").config();
async function connect() {
  try {
    // await mongoose.connect("mongodb://localhost:27017/chat-app");
    // await mongoose.connect(
    //   "mongodb+srv://hntreant23:hnam23012002@chat-app.d0hygrq.mongodb.net/chat-app"
    // );
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect succeeded");
  } catch (e) {
    console.log("connect fail");
  }
}

module.exports = { connect };
