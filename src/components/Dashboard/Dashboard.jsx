import "./dashboard.css";
import OverviewCards from "../overview-cards/OverviewCards";
import SearchFilter from "../search-filter/SearchFilter";
import ExpenseForm from "../expense-form/ExpenseForm";
import ExpenseTable from "../expense-table/ExpenseTable";
import { useState, useEffect } from "react";

const Dashboard = () => {

    const [editingExpense,setEditingExpense] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [expenses,setExpenses] = useState([]);

    useEffect(() => {
        console.log("useEffect running");

        fetch("http://localhost:3000/expenses")
            .then((res) => res.json())
            .then((data) => {
            console.log("API DATA:", data);
            setExpenses(data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <main className="dashboard">
        <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your financial overview.</p>
        </div>

        <OverviewCards expenses={expenses} />
        <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
        />
        <ExpenseForm  
            setExpenses={setExpenses}
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
        />
        <ExpenseTable 
            expenses={expenses} 
            setExpenses={setExpenses}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            setEditingExpense={setEditingExpense}
        />
        </main>
    );
};

export default Dashboard;