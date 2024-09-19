import { useState, useEffect } from 'react';
import './../styles/FilterBar.css';

function FilterBar({ onSearch, onFilter, currentSearch, showCheckedIn }) {
    const [searchTerm, setSearchTerm] = useState(currentSearch || '');  // Remember the search term
    const [sortBy, setSortBy] = useState({});  // Initialize the sortBy state to track sorting

    // Update searchTerm whenever currentSearch from props changes
    useEffect(() => {
        setSearchTerm(currentSearch);  
    }, [currentSearch]);

    // Handle search input change
    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm); 
        onSearch(newSearchTerm); // Send the new search term back up to the parent (App.js)
    };

    // Handle sorting and send it to the parent
    const handleSort = (sortByThis) => {
        const newSortBy = { ...sortBy }; // Make a copy of the current sortBy state
        if (!newSortBy[sortByThis]) {
            newSortBy[sortByThis] = 'asc'; // First click: sort ascending
        } else if (newSortBy[sortByThis] === 'asc') {
            newSortBy[sortByThis] = 'desc'; // Toggle to descending
        } else {
            newSortBy[sortByThis] = null; // Toggle off sorting
        }
        setSortBy(newSortBy);  // Update the sortBy state
        onFilter(sortByThis, newSortBy[sortByThis]); // Send it back up to App
    };

    return (
      <div className="filter-bar">
        <div className="search-input-clear">
          <span className="search-icon">&#128269;</span>
          <input
            type="text"
            placeholder="Search dog"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {/* Clear button */}
          <button
            type="button"
            className="clear-button"
            onClick={() => handleSearchChange({ target: { value: '' } })}
            aria-label="Clear search"
          >
            &#10006; 
          </button>
        </div>
        <div className="filter-buttons">
          <button onClick={() => handleSort('breed')}>
            Breed {sortBy.breed === 'asc' ? '↑' : sortBy.breed === 'desc' ? '↓' : ''}
          </button>
          <button onClick={() => handleSort('age')}>
            Age {sortBy.age === 'asc' ? '↑' : sortBy.age === 'desc' ? '↓' : ''}
          </button>
          <button onClick={() => handleSort('size')}>
            Size {sortBy.size === 'asc' ? '↑' : sortBy.size === 'desc' ? '↓' : ''}
          </button>
          <button onClick={() => handleSort('present')}>
            {showCheckedIn ? 'Show All Dogs' : 'Show Checked-In Dogs'}
          </button>
        </div>
      </div>
    );
}

export default FilterBar;
