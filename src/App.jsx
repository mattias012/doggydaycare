import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import CatalogOfDogs from './components/CatalogOfDogs.jsx';
import Dog from './components/Dog.jsx';
import Navbar from './components/Navbar.jsx';
import './styles/App.css';

function App() {
  const [dogs, setDogs] = useState([]); 
  const [filteredDogs, setFilteredDogs] = useState([]);  
  const [currentFilter, setCurrentFilter] = useState(''); //Current search term
  const [showCheckedIn, setShowCheckedIn] = useState(false); //Track if only checked-in dogs are shown

  //Fetch data from the API when the app first loads
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/66ea6857e41b4d34e4325758');
        const data = await response.json();
        setDogs(data.record); //Set dogs data
        setFilteredDogs(data.record); //Initialize filteredDogs with all dogs initially
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDogs();
  }, []);

  //Handle search and update filteredDogs
  const handleSearch = (searchTerm) => {
    let baseDogs = showCheckedIn ? dogs.filter(dog => dog.present === true) : dogs; // Filter by checked-in status if necessary
    const filtered = baseDogs.filter(dog => 
      dog.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDogs(filtered); //Update the filtered dogs
    setCurrentFilter(searchTerm); //Save the current search term
  };

  //Handle filter based on check-in status (present) and other attributes
  const handleFilter = (filterThis, direction) => {
    let baseDogs = showCheckedIn ? dogs.filter(dog => dog.present === true) : dogs; //Filter by checked-in status if necessary

    if (filterThis === 'present') {
      setShowCheckedIn(!showCheckedIn); //Toggle between showing all dogs and showing only checked-in dogs
      if (!showCheckedIn) {
        const checkedInDogs = dogs.filter(dog => dog.present === true); //Show only checked-in dogs
        setFilteredDogs(checkedInDogs);
      } else {
        setFilteredDogs(dogs); //Reset to show all dogs
      }
    } else {
      let sortedDogs = [...baseDogs]; //Use the baseDogs (either all or only checked-in)
      if (direction === 'asc') {
        sortedDogs.sort((a, b) => (a[filterThis] > b[filterThis] ? 1 : -1)); //Ascending sort
      } else if (direction === 'desc') {
        sortedDogs.sort((a, b) => (a[filterThis] < b[filterThis] ? 1 : -1)); //Descending sort
      } else {
        sortedDogs = baseDogs; //Reset to original order
      }
      setFilteredDogs(sortedDogs); //Update the sorted list
    }
  };

  return (
    <div className='big-container'>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/catalogOfDogs" 
          element={
            <CatalogOfDogs 
              dogs={filteredDogs} 
              onSearch={handleSearch} 
              onFilter={handleFilter}
              currentSearch={currentFilter}
              showCheckedIn={showCheckedIn}  // Pass showCheckedIn to FilterBar
            />
          } 
        />
        <Route path="/dog/:chipNumber" element={<Dog />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;