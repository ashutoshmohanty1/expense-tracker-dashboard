import { useMemo } from "react";
import "./OverviewCards.css";

const OverviewCards = ({ expenses = [] }) => {

  const totalExpenses = useMemo(() => {
    return expenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0
    );
  }, [expenses]);

  const totalTransactions = useMemo(() => {
    return expenses.length;
  }, [expenses]);

  return (
    <div className="overview-cards">

      <div className="card expense-card">
        <div className="card-title">
          TOTAL EXPENSES
        </div>

        <h2>₹{totalExpenses}</h2>

        <p>Total amount spent</p>
      </div>

      <div className="card">
        <div className="card-icon">
          <i className="bi bi-receipt"></i>
        </div>

        <div>
          <span>This Month</span>

          <h3>{totalTransactions}</h3>

          <p>Completed Transactions</p>
        </div>
      </div>

      <div className="card">
        <div className="card-icon">
          <i className="bi bi-bar-chart"></i>
        </div>

        <div>
          <span>Status</span>

          <h3>Active</h3>

          <p>Expense Tracking</p>
        </div>
      </div>

    </div>
  );
};

export default OverviewCards;