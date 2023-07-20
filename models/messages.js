const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        to: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        from: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        type: {
          type: String,
          enum: ["Text", "Media", "Document", "Link"],
        },
        created_at: {
          type: Date,
          default: Date.now(),
        },
        text: {
          type: String,
        },
        file: {
          type: String,
        },
        createdAt: {
          type: String,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Message = mongoose.model("Messages", MessageSchema);
module.exports = Message;
