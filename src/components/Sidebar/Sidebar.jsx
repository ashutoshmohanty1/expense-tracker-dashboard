import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <div className="logo">
        <h3>FinPrecision</h3>
      </div>

      <ul className="menu">

        <li className="active">
          <i className="bi bi-grid"></i>
          Dashboard
        </li>

      </ul>

    </aside>
  );
};

export default Sidebar;