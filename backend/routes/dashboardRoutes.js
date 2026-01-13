import express from "express";
import {getDashboardData} from "../controllers/dashboardController.js";

const router = express.Router();

// GET /dashboard
router.get("/summary", getDashboardData);
export default router;
