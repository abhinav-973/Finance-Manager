import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import expenseRoutes from "./routes/expenseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import splitExpenseRoutes from "./routes/splitExpenseRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// Database
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/split-expenses", splitExpenseRoutes);
// Root test route

app.get("/", (req, res) => {
  res.send("Backend API running");
});

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
