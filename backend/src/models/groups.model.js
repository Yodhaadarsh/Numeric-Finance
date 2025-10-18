const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      role: { type: String, enum: ["admin", "member"], default: "member" },
    },
  ],

  

});

const GroupModel = mongoose.model("Group", GroupSchema);

module.exports = GroupModel;
