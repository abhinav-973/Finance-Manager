import express from "express";
import { createSplitExpense } from "../controllers/splitExpenseController.js";

const router = express.Router();

router.post("/", createSplitExpense);

export default router;
