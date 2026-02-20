import SplitExpense from "../models/SplitExpense.js";

export const createSplitExpense = async (req, res) => {
  try {
    const { title, amount, splitType, participants } = req.body;

    // Basic validation
    if (!title || !amount || !splitType || !participants) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    // Custom split validation
    if (splitType === "custom") {
      const total = participants.reduce(
        (sum, p) => sum + Number(p.share || 0),
        0
      );

      if (total !== Number(amount)) {
        return res.status(400).json({
          message: "Custom split total must equal amount"
        });
      }
    }

    // Equal split safety (backend recalculates)
    if (splitType === "equal") {
      const equalShare = Number(amount) / participants.length;
      participants.forEach(p => {
        p.share = Number(equalShare.toFixed(2));
      });
    }

    const expense = await SplitExpense.create({
      title,
      amount,
      splitType,
      participants
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create split expense",
      error: error.message
    });
  }
};
