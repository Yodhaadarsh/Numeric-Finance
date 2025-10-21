const ExpenseTrackerModel = require("../models/expense.tracker.model");
const GroupModel = require("../models/groups.model");

const createExpenseEntry = async (req, res) => {
  const { income, education, medicine, grocery, others, year, month } =
    req.body;

  if (!income || !month || !year) {
    return res.status(400).json({ message: "Income is required" });
  }

  const expense = await ExpenseTrackerModel.findOne({
    month,
    year,
  });

  if (expense) {
    return res.send("already have a expense of same month and year");
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
      return res.status(400).json({
        message: "Total expenses cannot be less than or equal to income",
      });
    }

    const newExpenseEntry = await ExpenseTrackerModel.create({
      user: req.user._id,
      income,
      education,
      medicine,
      grocery,
      others,
      totalExpenses,
      savings,
      month,
      year,
    });

    res
      .status(201)
      .json({ message: "Expense entry created successfully", newExpenseEntry });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const groupExpenseEntry = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { income, education, medicine, grocery, others } = req.body;
    const group = await GroupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const member = await group.members.find(
      (m) => m.userId.toString() === req.user._id.toString()
    );

    if (!member) {
      return res
        .status(403)
        .json({ message: "You are not a member of this group" });
    }

    let totalExpenses = 0;
    totalExpenses =
      (education || 0) + (medicine || 0) + (grocery || 0) + (others || 0);

    const savings = income - totalExpenses;

    if (totalExpenses >= income) {
      return res.status(400).json({
        message: "Total expenses cannot be less than or equal to income",
      });
    }

    const newExpenseEntry = await ExpenseTrackerModel.create({
      user: req.user._id,
      groupId: group._id,
      income,
      education,
      medicine,
      grocery,
      others,
      savings,
      totalExpenses,
    });

    group.expenses.push({
      expensesId: newExpenseEntry._id,
      userId: req.user._id,
    });

    await group.save();

    res.status(201).json({
      message: "Group expense entry created successfully",
      newExpenseEntry,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

module.exports = { createExpenseEntry, groupExpenseEntry };
