import Expense from "../models/Expense.js";


export const getDashboardData = async(req, res) => {
    try {
        const result = await Expense.aggregate([
            {
                $group: {
                    _id: "$type",
                    totalAmount: {$sum: "$amount"}
                },
            },
        ]);
        let totalIncome = 0;
        let totalExpense = 0;

        for(const item of result) {
            if(item._id === "income") {
                totalIncome = item.totalAmount;
            } else if(item._id === "expense") {
                totalExpense = item.totalAmount;
            }
        }
        const balance = totalIncome - totalExpense;

        res.status(200).json({
            totalIncome, 
            totalExpense,
            balance,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch dashboard data",
            error: error.message,
        })
    }
}