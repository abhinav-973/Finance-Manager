import React from 'react'
import axios from 'axios'

const API_URL = "http://localhost:5000";

export async function fetchDashboardData() {
    const response = await axios.get(`${API_URL}/dashboard/summary`);
    return response.data;
}