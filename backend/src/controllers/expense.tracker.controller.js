const ExpenseTrackerModel = require("../models/expense.tracker.model");

const createExpenseEntry = async (req, res) => {
  const { user, income, education, medicine, grocery, others , savings } = req.body;

  if (!income) {
    return res.status(400).json({ message: "Income is required" });
  }

  try {
    let totalExpenses = 0;
    let savings = 0;
    if (education) totalExpenses += education;
    if (medicine) totalExpenses += medicine;
    if (grocery) totalExpenses += grocery;
    if (others) totalExpenses += others;

    savings = income - totalExpenses;

    if (totalExpenses >= income) {
        return res.status(400).json({ message: "Total expenses cannot be less than or equal to income" });
    }


    const newExpenseEntry = await ExpenseTrackerModel.create({
      user:req.user._id,
      income,
      education,
      medicine,
      grocery,
      others,
      totalExpenses,
      savings
      
    });
    res.status(201).json({ message: "Expense entry created successfully", newExpenseEntry });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};



module.exports = { createExpenseEntry };