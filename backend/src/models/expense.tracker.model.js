const mongoose = require("mongoose");

const expenseTrackerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    groupId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
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
    totalExpenses: {
      type: Number,
      required: true,
    },
    savings: {
      type: Number,
      required: true,
    },
    date:{
      type: Date,
       default: Date.now,
      required: true,
    }
    
  },
  { timeseriestamps: true }
);

const ExpenseTracker = mongoose.model("ExpenseTracker", expenseTrackerSchema);

module.exports = ExpenseTracker;
