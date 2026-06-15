import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";

import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;