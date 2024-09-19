import { useState, useEffect } from 'react';
import './../styles/FilterBar.css';

function FilterBar(props) {
    const [searchTerm, setSearchTerm] = useState(props.searchTerm || '');  //remember the searchTerm
    const [sortBy, setSortBy] = useState({}); // remember the sort order as an Object?


     //call this function when the user searches for anything, this is a function that sends the search term back to parent as a function, props.onSearch
    //when the user searches
      const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
            setSearchTerm(newSearchTerm); 
            props.onSearch(newSearchTerm); 
      };
    
      useEffect(() => {
        setSearchTerm(props.searchTerm);  // Uppdatera searchTerm när currentSearch ändras
    }, [searchTerm]);
  
    //first we have a local function that handles the search, by calling the filter function on level up, using the props.
    const handleSort = (sortByThis) => {
      const newSortBy = { ...sortBy }; //copy and save current sort order
      if (!newSortBy[sortByThis]) {
        newSortBy[sortByThis] = 'asc'; //on first click, sort by ascending
      } else if (newSortBy[sortByThis] === 'asc') {
        newSortBy[sortByThis] = 'desc'; //in case we have ascending already, we change to descending order
      } else {
        newSortBy[sortByThis] = null; //in case we have descending showing, we toggle to normal (null) sorting.
      }
      //set the sortOrder state, which is in this file.
      setSortBy(newSortBy);
      props.onFilter(sortByThis, newSortBy[sortByThis]); //send it back up to catalogOfDogs by using the props function -> props.onFilter
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