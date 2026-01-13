import axios from "axios";

const API_URL = "http://localhost:5000";

export async function createExpense(expenseData) {
    const response = await axios.post(`${API_URL}/expenses`, expenseData);
    return response.data;
}

export async function fetchExpenses() {
    const response = await axios.get(`${API_URL}/expenses`);
    return response.data;
}
