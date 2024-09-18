import React, { useState } from 'react';
import './../styles/FilterBar.css';

function FilterBar(props) {
    const [searchTerm, setSearchTerm] = useState('');  // Håller söktermen lokalt
    const [sortBy, setSortBy] = useState({}); // Håller koll på sorteringsordning
  
    // Anropar props.onSearch när användaren söker
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
      props.onSearch(e.target.value); // Skickar söktermen till props.onSearch
    };
  
    // Hanterar sortering och anropar props.onFilter när användaren sorterar
    const handleSort = (attribute) => {
      const newSortBy = { ...sortBy }; // Kopierar den nuvarande sorteringsordningen
      if (!newSortBy[attribute]) {
        newSortBy[attribute] = 'asc'; // Första klick, sortera stigande
      } else if (newSortBy[attribute] === 'asc') {
        newSortBy[attribute] = 'desc'; // Om stigande, ändra till fallande
      } else {
        newSortBy[attribute] = null; // Om fallande, ta bort sorteringen
      }
      setSortBy(newSortBy);
      props.onFilter(attribute, newSortBy[attribute]); // Skickar attribut och riktning till props.onFilter
    };
  
    return (
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch} // Kallar på handleSearch
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