const mongoose = require("mongoose");

const expenseTrackerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    education: {
      type: Number,
    },
    medicine: {
      type: Number,
    },
    grocery: {
      type: Number,
    },
    others: {
      type: Number,
    },
  },
  { timeseriestamps: true }
);



const ExpenseTracker = mongoose.model("ExpenseTracker", expenseTrackerSchema);

module.exports = ExpenseTracker;
