import React, { useState, useEffect } from 'react';
import './../styles/FilterBar.css';

function FilterBar(props) {
    const [searchTerm, setSearchTerm] = useState(props.currentSearch || '');  // Remember the search term
    const [sortBy, setSortBy] = useState({});  // Initialize the sortBy state to track sorting

    // Update searchTerm whenever currentSearch from props changes
    useEffect(() => {
        setSearchTerm(props.currentSearch);  
    }, [props.currentSearch]);

    // Handle search input change
    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm); 
        props.onSearch(newSearchTerm);  // Send the new search term back up to the parent (App.js)
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
        props.onFilter(sortByThis, newSortBy[sortByThis]); // Send it back up to App.js
    };

    return (
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search dog"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
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
        </div>
      </div>
    );
}

export default FilterBar;
