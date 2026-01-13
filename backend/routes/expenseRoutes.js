import express from "express";
import {
  createExpense,
  getExpenses,
} from "../controllers/expenseController.js";

const router = express.Router();

// POST /expenses
router.post("/", createExpense);

// GET /expenses
router.get("/", getExpenses);

export default router;
