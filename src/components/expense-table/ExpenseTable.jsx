import { useCallback } from "react";
import "./ExpenseTable.css";

const ExpenseTable = ({
  expenses = [],
  setExpenses,
  searchTerm = "",
  selectedCategory = "All Categories",
  setEditingExpense
}) => {

  const handleDelete = useCallback(async (id) => {
    try {
      await fetch(`http://localhost:3000/expenses/${id}`, {
        method: "DELETE",
      });

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  }, [setExpenses]);

  const filteredExpenses = expenses.filter((expense) => {

    const matchesSearch =
      expense.expenseName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories"
        ? true
        : expense.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  console.log("Search:", searchTerm);
  console.log("Category:", selectedCategory);
  console.log("Expenses:", expenses);
  console.log("Filtered:", filteredExpenses);

  return (
    <div className="expense-table-container">
      <div className="table-header">
        <h3>Recent Transactions</h3>
      </div>

      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Expense Name</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredExpenses.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No Expenses Found
              </td>
            </tr>
          ) : (
            filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.expenseName}</td>
                <td>{expense.category}</td>
                <td>₹{expense.amount}</td>

                <td>
                  <button className="edit-btn" onClick={()=> setEditingExpense(expense)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(expense.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;