import Expense from "../models/Expense.js";

export const createExpense = async (req, res) => {
  try {
    const { title, amount, type } = req.body;

    if (!title || !amount || !type) {
      return res.status(400).json({
        message: "title, amount and type are required",
      });
    }

    const expense = await Expense.create({
      title,
      amount,
      type,
    });

    res.status(201).json({
      message: "Expense created",
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create expense",
      error: error.message,
    });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
    });
  }
};
