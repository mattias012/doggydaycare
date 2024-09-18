import React from 'react';
import DogCard from '../components/DogCard';
import './../styles/CatalogOfDogs.css';
import FilterBar from '../components/FilterBar';
import { useState, useEffect } from 'react';


function CatalogOfDogs() {

  const [dogs, setDogs] = useState([]);  // Vi kommer att uppdatera denna med data från API:et
  const [filteredDogs, setFilteredDogs] = useState([]);  // Filtrerade hundar baserat på sök och filter
  const [loading, setLoading] = useState(true);  // För att visa en laddningsstatus

  //lets use useEffect to fetch data from API:et when the component has loaded
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/66ea6857e41b4d34e4325758');
        const data = await response.json(); //convert json object to javascript stuff
        setDogs(data.record);  //set dogs data
        setFilteredDogs(data.record);  //init the filteredList with our newly fetch data as well, initially the same as above.
        setLoading(false);  //set loading to false when done.
      } catch (error) { //catch any errors
        console.error('Error fetching data:', error);
        setLoading(false);  //close loading in case of failure.
      }
    };

    fetchDogs();
  }, []);  //empty array as dependecies, means that we only run in once on rendering


  //Handle the search, and send the searchresult via props to FilterBar.
  const handleSearch = (searchTerm) => {
    const filtered = dogs.filter(dog => 
      dog.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDogs(filtered);
  };

  //handle the sortorder and send it to filterbar using props
  const handleFilter = (filterThis, direction) => {
    let sortedDogs = [...dogs]; //copy and save list
    if (direction === 'asc') {
      sortedDogs.sort((a, b) => (a[filterThis] > b[filterThis] ? 1 : -1)); //asc
    } else if (direction === 'desc') {
      sortedDogs.sort((a, b) => (a[filterThis] < b[filterThis] ? 1 : -1)); //desc
    } else {
      sortedDogs = dogs; //set normal data
    }
    setFilteredDogs(sortedDogs); //update order
  };

  if (loading) {
    return (
      <div className="spinner"></div>  // CSS-baserad spinner
    );
  }

  return (
    <div>
      {/* Skickar props (onSearch och onFilter) till FilterBar */}
      <FilterBar onSearch={handleSearch} onFilter={handleFilter} />
      <div className="catalog-of-dogs">
        {filteredDogs.map((dog) => (
          <DogCard key={dog.chipNumber} dog={dog} />
        ))}
      </div>
    </div>
  );
}

export default CatalogOfDogs;