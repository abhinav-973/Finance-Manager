import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import expenseRoutes from "./routes/expenseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// Database
connectDB();

// Routes
app.use("/expenses", expenseRoutes);
app.use("/dashboard", dashboardRoutes);
// Root test route
app.get("/", (req, res) => {
  res.send("Backend API running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
