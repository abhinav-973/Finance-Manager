import { useState } from "react";
import { createExpense } from "../services/ExpenseService";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const expenseData = {
      title,
      amount: Number(amount),
      type,
    };

    try {
      setLoading(true);
      await createExpense(expenseData);

      // Clear form on success
      setTitle("");
      setAmount("");
      setType("expense");

      alert("Expense added successfully");
    } catch (err) {
      setError("Failed to add expense");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add Expense</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Title */}
        <div>
          <label className="block text-gray-600 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-600 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-gray-600 mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
