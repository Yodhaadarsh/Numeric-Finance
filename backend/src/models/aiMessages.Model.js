const mongoose = require("mongoose");

const AiMessagesSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["ai", "user"], // Only allow these values
      required: true,
      default: "ai",
    },
    text: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const AiMessagesModel = mongoose.model("AiMessage", AiMessagesSchema);

module.exports = AiMessagesModel;
