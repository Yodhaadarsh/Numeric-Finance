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

  expenses: [
    {
      expensesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExpenseTracker",
      },
      userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    },
  ],


});

const GroupModel = mongoose.model("Group", GroupSchema);

module.exports = GroupModel;
