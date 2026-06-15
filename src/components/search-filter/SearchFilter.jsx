import "./SearchFilter.css";

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="search-filter-container">

      <div className="search-box">
        <i className="bi bi-search"></i>

        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-section">

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
        >
          <option>All Categories</option>
          <option>Food</option>
          <option>Shopping</option>
          <option>Travel</option>
          <option>Bills</option>
          <option>Others</option>
        </select>

      </div>

    </div>
  );
};

export default SearchFilter;