const mongoose = require("mongoose");

const videoCallSchema = new mongoose.Schema({
  caller: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  recipient: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["busy", "free"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const VideoCall = mongoose.model("VideoCall", videoCallSchema);
module.exports = VideoCall;
