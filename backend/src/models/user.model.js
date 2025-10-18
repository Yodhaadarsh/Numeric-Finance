const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fullname: {
      fristname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
      },
    },
    password: {
      type: String,
      required: true,
    },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }]
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
