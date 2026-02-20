import { useState } from "react";
import { createExpense } from "../services/ExpenseService";
import {
  Plus,
  Loader2,
  DollarSign,
  FileText,
  ArrowDownCircle,
  ArrowUpCircle,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const navigate = useNavigate();
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

      // Optional: Redirect back to dashboard or expenses list after success
      // navigate("/expenses");

      // Or just clear form
      setTitle("");
      setAmount("");
      setType("expense");
      alert("Transaction saved successfully");
    } catch (err) {
      setError("Failed to add transaction. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      {/* CARD CONTAINER */}
      <div className="bg-black border border-zinc-900 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative Background Glow */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 opacity-20 blur-[100px] pointer-events-none transition-colors duration-500 ${
            type === "expense" ? "bg-red-600" : "bg-emerald-600"
          }`}
        ></div>

        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white mb-2">
            New Transaction
          </h1>
          <p className="text-zinc-500 text-sm mb-8">
            Record your daily spending or income.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ERROR ALERT */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
                <X size={16} /> {error}
              </div>
            )}

            {/* 1. TYPE SELECTOR (Segmented Control) */}
            <div className="grid grid-cols-2 gap-4 p-1 rounded-2xl bg-zinc-900/50 border border-zinc-900">
              <button
                type="button"
                onClick={() => setType("income")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  type === "income"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20"
                    : "text-zinc-500 hover:text-emerald-400 hover:bg-zinc-800"
                }`}
              >
                <ArrowUpCircle size={18} />
                Income
              </button>

              <button
                type="button"
                onClick={() => setType("expense")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  type === "expense"
                    ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
                    : "text-zinc-500 hover:text-red-400 hover:bg-zinc-800"
                }`}
              >
                <ArrowDownCircle size={18} />
                Expense
              </button>
            </div>

            {/* 2. TITLE INPUT */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Title
              </label>
              <div className="relative group">
                <FileText
                  className="absolute left-4 top-3.5 text-zinc-500 group-focus-within:text-white transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Grocery Shopping"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all placeholder:text-zinc-700"
                  required
                />
              </div>
            </div>

            {/* 3. AMOUNT INPUT */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Amount
              </label>

              <div className="relative group">
                {/* Rupee SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`absolute left-4 top-3.5 h-[18px] w-[18px] transition-colors ${
                    type === "expense" ? "text-red-500" : "text-emerald-500"
                  }`}
                >
                  <path d="M6 3h12" />
                  <path d="M6 8h12" />
                  <path d="M6 13l6 8h4" />
                  <path d="M6 13h6a4 4 0 0 0 0-8" />
                </svg>

                <input
                  type="number"
                  min="0" // ⛔ blocks negative from arrows
                  step="10"
                  value={amount}
                  onChange={(e) => {
                    const value = e.target.value;

                    // ⛔ block negative values manually (copy-paste safe)
                    if (value === "" || Number(value) >= 0) {
                      setAmount(value);
                    }
                  }}
                  placeholder="0.00"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all placeholder:text-zinc-700 font-mono"
                  required
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-4 rounded-xl font-bold text-black bg-white hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Plus size={20} strokeWidth={3} />
                  Add Transaction
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
