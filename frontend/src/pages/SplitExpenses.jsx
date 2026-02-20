import React, { useEffect, useState } from "react";
import { createSplitExpense } from "../services/splitExpentService";
import {
  Plus,
  IndianRupee,
  FileText,
  CheckCircle,
  AlertCircle,
  Divide,
  UserPlus,
} from "lucide-react";

function SplitExpenses() {
  // ------------------ STATE ------------------
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [split, setSplit] = useState("equal");
  const canAddPerson = newPerson.trim().length > 0;

  // Convert once (important)
  const numericAmount = Number(amount);

  // ------------------ ADD PERSON ------------------
  const addPerson = () => {
    if (!newPerson.trim()) return;
    setPeople((prev) => [...prev, { name: newPerson, share: 0 }]);
    setNewPerson("");
  };

  // ------------------ REMOVE PERSON ------------------
  const removePerson = (index) => {
    setPeople((prev) => prev.filter((_, i) => i !== index));
  };

  // ------------------ EQUAL SPLIT LOGIC ------------------
  useEffect(() => {
    if (split === "equal" && people.length > 0 && numericAmount > 0) {
      const equalShare = Number((numericAmount / people.length).toFixed(2));

      setPeople((prev) => prev.map((p) => ({ ...p, share: equalShare })));
    }
  }, [split, numericAmount, people.length]);

  // ------------------ CUSTOM SHARE UPDATE ------------------
  const updateShare = (index, value) => {
    setPeople((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        share: Number(value),
      };
      return updated;
    });
  };

  // ------------------ VALIDATION ------------------
  const totalCustom = people.reduce((sum, p) => sum + Number(p.share || 0), 0);

  const isEqualValid =
    split === "equal" && numericAmount > 0 && people.length > 0;

  const isCustomValid =
    split === "custom" &&
    numericAmount > 0 &&
    people.length > 0 &&
    Math.abs(totalCustom - numericAmount) < 0.01;

  const isValid = isEqualValid || isCustomValid;

  const remainingAmount =
    split === "custom" ? (numericAmount - totalCustom).toFixed(2) : "0.00";
// ------------------ SAVE EXPENSE ------------------
const saveExpense = async () => {
  try {
    await createSplitExpense({
      title,
      amount: Number(amount),
      splitType: split,
      participants: people,
    });

    // Reset UI
    setTitle("");
    setAmount("");
    setPeople([]);
    setSplit("equal");

    localStorage.removeItem("splitExpenseDraft");

    alert("Expense saved successfully ✅");
  } catch (error) {
    console.error(error);
    alert("Failed to save expense ❌");
  }
};

  // ------------------ UI ------------------
  return (
    <div className="w-full max-w-xl mx-auto mt-6">
      <div className="bg-black border border-zinc-900 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-900/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-900/10 blur-[100px]" />

        <div className="relative z-10 space-y-6">
          {/* HEADER */}
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Divide className="text-indigo-500" />
              Split Expenses
            </h2>
            <p className="text-zinc-500 text-sm">
              Divide bills among friends effortlessly.
            </p>
          </div>

          {/* TITLE & AMOUNT */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <FileText className="absolute left-4 top-3.5 text-zinc-500" />
              <input
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 pl-12"
                placeholder="Expense Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="relative">
              <IndianRupee className="absolute left-4 top-3.5 text-zinc-500" />
              <input
                type="number"
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 pl-12 font-mono"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          {/* ADD PEOPLE */}
          <div>
            <label className="text-xs text-zinc-500 uppercase font-bold">
              Group Members
            </label>

            <div className="flex gap-2 mt-2">
              <div className="relative flex-1">
                <UserPlus className="absolute left-4 top-3.5 text-zinc-500" />
                <input
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 pl-12"
                  placeholder="Add person name..."
                  value={newPerson}
                  onChange={(e) => setNewPerson(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addPerson()}
                />
              </div>
              <button
                onClick={addPerson}
                onKeyDown={(e) => e.key === "Enter" && addPerson()}
                disabled={!canAddPerson}
                className={`px-4 rounded-xl transition-all duration-200 ${
                  canAddPerson
                    ? "bg-white text-black hover:scale-105 "
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                }`}
              >
                <Plus />
              </button>
            </div>

            {/* PEOPLE LIST */}
            <div className="space-y-2 mt-4">
              {people.map((person, index) => (
                <div
                  key={index}
                  className="group flex justify-between items-center bg-zinc-900 p-3 rounded-xl transition"
                >
                  <span className="text-white">{person.name}</span>

                  <div className="flex items-center gap-3">
                    {/* Share */}
                    {split === "custom" ? (
                      <input
                        type="number"
                        className="w-24 bg-zinc-950 border border-zinc-700 text-white rounded px-2 text-right"
                        value={person.share}
                        onChange={(e) => updateShare(index, e.target.value)}
                      />
                    ) : (
                      <span className="text-emerald-400 font-mono">
                        ₹ {person.share}
                      </span>
                    )}

                    {/* Remove Button */}
                    <button
                      onClick={() => removePerson(index)}
                      className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 transition
                      bg-red-600/10 hover:bg-red-600/20 p-1 rounded-full"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SPLIT TOGGLE */}
          <div className="grid grid-cols-2 gap-2 bg-zinc-900 p-1 rounded-xl">
            <button
              onClick={() => setSplit("equal")}
              className={`py-2 rounded-lg ${
                split === "equal" ? "bg-zinc-800 text-white" : "text-zinc-500"
              }`}
            >
              Equal Split
            </button>
            <button
              onClick={() => setSplit("custom")}
              className={`py-2 rounded-lg ${
                split === "custom" ? "bg-zinc-800 text-white" : "text-zinc-500"
              }`}
            >
              Custom Split
            </button>
          </div>

          {/* VALIDATION */}
          {split === "custom" && (
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Remaining:</span>
              <span
                className={`font-mono ${
                  Number(remainingAmount) === 0
                    ? "text-emerald-500"
                    : "text-red-500"
                }`}
              >
                ₹ {remainingAmount}
              </span>
            </div>
          )}

          {!isCustomValid && split === "custom" && (
            <div className="flex items-center gap-2 text-red-400 text-xs">
              <AlertCircle size={14} />
              Total split must match expense amount.
            </div>
          )}

          {/* SAVE BUTTON */}
          <button
            onClick={saveExpense}
            disabled={!isValid || !title}
            className={`w-full py-4 rounded-xl font-bold flex justify-center gap-2 ${
              isValid && title
                ? "bg-white text-black"
                : "bg-zinc-900 text-zinc-600"
            }`}
          >
            {isValid ? <CheckCircle /> : <AlertCircle />}
            Save Expense
          </button>
        </div>
      </div>
    </div>
  );
}

export default SplitExpenses;
