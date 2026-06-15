import { useState, useRef, useEffect } from "react";
import "./ExpenseForm.css";

const ExpenseForm = ({ setExpenses, editingExpense, setEditingExpense }) => {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const expenseNameRef = useRef(null);

    useEffect(() => {
        if (editingExpense) {
            setExpenseName(editingExpense.expenseName);
            setAmount(editingExpense.amount);
            setCategory(editingExpense.category);
            setDate(editingExpense.date);
        }
    }, [editingExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!expenseName || !amount || !category || !date) {
      alert("Please fill all fields");
      return;
    }

    const expenseData = {
      expenseName,
      amount,
      category,
      date,
    };

    if (editingExpense) {
        const response = await fetch(
            `http://localhost:3000/expenses/${editingExpense.id}`,
            {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(expenseData),
            }
        );

        const updatedExpense = await response.json();

        setExpenses((prev) =>
            prev.map((expense) =>
            expense.id === updatedExpense.id
                ? updatedExpense
                : expense
            )
        );

        setExpenseName("");
        setAmount("");
        setCategory("");
        setDate("");

        setEditingExpense(null);

        expenseNameRef.current.focus();

        } else {
        const response = await fetch(
            "http://localhost:3000/expenses",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(expenseData),
            }
        );

        const savedExpense = await response.json();

        setExpenses((prev) => [
            ...prev,
            savedExpense,
        ]);

        setExpenseName("");
        setAmount("");
        setCategory("");
        setDate("");

        expenseNameRef.current.focus();
        }
    };

  return (
    <div className="expense-form-container">
    <h3>
        {editingExpense ? "Edit Expense" : "Add Expense"}
    </h3>

      <form className="expense-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Expense Name</label>
          <input
            ref={expenseNameRef}
            type="text"
            placeholder="Enter expense name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option>Food</option>
            <option>Shopping</option>
            <option>Travel</option>
            <option>Bills</option>
            <option>Others</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="add-btn">
          {
            editingExpense ? "Update Expense" : "Add Expense"
          }
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;