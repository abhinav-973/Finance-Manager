import axios from "axios";

const API_URL = "http://localhost:5000";

export async function createSplitExpense(expenseData) {
    const response = await axios.post(`${API_URL}/split-expenses`, expenseData);
    return response.data;
}