
import DogCard from '../components/DogCard';
import './../styles/CatalogOfDogs.css';
import FilterBar from '../components/FilterBar';
import { useState, useEffect } from 'react';

function CatalogOfDogs() {

  
  const [currentFilter, setCurrentFilter] = useState(''); //current filter for search

  const [dogs, setDogs] = useState([]); 
  const [filteredDogs, setFilteredDogs] = useState([]);  
  const [loading, setLoading] = useState(true); 

  //lets use useEffect to fetch data from API:et when the component has loaded
  useEffect(() => {
    const fetchDogs = async () => {
      try {

        const response = await fetch('https://api.jsonbin.io/v3/b/66ea6857e41b4d34e4325758');
        const data = await response.json(); //convert json object to javascript stuff
        setDogs(data.record);  //set dogs data
        setFilteredDogs(data.record);  //init the filteredList with our newly fetch data as well, initially the same as above.
        setLoading(false);  //set loading to false when done.
      }
      
        catch (error) { //catch any errors
        console.error('Error fetching data:', error);
        setLoading(false);  //close loading in case of failure.
      }
    };

    fetchDogs();
  }, []);  //empty array as dependecies, means that we only run in once on rendering

  //this is used when we return from the detail page, resume previous filters
  useEffect(() => {
    if (filteredDogs.length > 0 || currentFilter !== '') {
      console.log("Saving to sessionStorage", { filteredDogs, searchTerm: currentFilter });
      sessionStorage.setItem('dogFilterState', JSON.stringify({
        filteredDogs,
        searchTerm: currentFilter,
      }));
    }
  }, [filteredDogs, currentFilter]);
  
  
  //get data from sessionStorage
  useEffect(() => {
    if (filteredDogs.length > 0 || currentFilter !== '') {
      console.log("Saving to sessionStorage", { filteredDogs, searchTerm: currentFilter });
      sessionStorage.setItem('dogFilterState', JSON.stringify({
        filteredDogs,
        searchTerm: currentFilter,
      }));
    }
  }, [filteredDogs, currentFilter]);
  

  //Handle the search, and send the searchresult via props to FilterBar.
  const handleSearch = (searchTerm) => {
    const filtered = dogs.filter(dog => 
      dog.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDogs(filtered);
    setCurrentFilter(searchTerm); //save current search string
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
      <div className="spinner"></div>  //our spinner
    );
  }

  return (
    <div>
      <FilterBar onSearch={handleSearch} onFilter={handleFilter} />
      <div className="catalog-container">
      <div className="catalog-of-dogs">
      {filteredDogs.map((dog) => (
            <DogCard
              key={dog.chipNumber}
              dog={dog}
              currentFilter={{ filteredDogs, searchTerm: currentFilter }} //making sure we send the filters
            />
          ))}
      </div>
    </div>
    </div>
  );
}

export default CatalogOfDogs;