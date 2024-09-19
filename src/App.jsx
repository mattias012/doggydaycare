import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home.jsx';
import CatalogOfDogs from './components/CatalogOfDogs.jsx';
import Dog from './components/Dog.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  const [dogs, setDogs] = useState([]); 
  const [filteredDogs, setFilteredDogs] = useState([]);  
  const [currentFilter, setCurrentFilter] = useState(''); // Current search term
  const [showCheckedIn, setShowCheckedIn] = useState(false); // Track if only checked-in dogs are shown

  // Fetch data from the API when the app first loads
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/66ea6857e41b4d34e4325758');
        const data = await response.json();
        setDogs(data.record); // Set dogs data
        setFilteredDogs(data.record); // Initialize filteredDogs with all dogs initially
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDogs();
  }, []);

  // Handle search and update filteredDogs
  const handleSearch = (searchTerm) => {
    const filtered = dogs.filter(dog => 
      dog.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDogs(filtered); // Update the filtered dogs
    setCurrentFilter(searchTerm); // Save the current search term
  };

  // Handle filter based on check-in status (present) and show only checked-in dogs
  const handleFilter = (filterThis, direction) => {
    if (filterThis === 'present') {
      console.log("Toggling showCheckedIn:", !showCheckedIn);  // Log the change in state
      setShowCheckedIn(!showCheckedIn); // Toggle between showing all dogs and showing only checked-in dogs
      if (!showCheckedIn) {
        const checkedInDogs = dogs.filter(dog => dog.present === true); // Show only checked-in dogs
        setFilteredDogs(checkedInDogs);
      } else {
        setFilteredDogs(dogs); // Reset to show all dogs
      }
    } else {
      let sortedDogs = [...dogs];
      if (direction === 'asc') {
        sortedDogs.sort((a, b) => (a[filterThis] > b[filterThis] ? 1 : -1)); // Ascending sort
      } else if (direction === 'desc') {
        sortedDogs.sort((a, b) => (a[filterThis] < b[filterThis] ? 1 : -1)); // Descending sort
      } else {
        sortedDogs = dogs; // Reset to original order
      }
      setFilteredDogs(sortedDogs); // Update the sorted list
    }
  };

  return (
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
              showCheckedIn={showCheckedIn} // Pass showCheckedIn to FilterBar
            />
          } 
        />
        <Route path="/dog/:chipNumber" element={<Dog />} />
      </Routes>
    </Router>
  );
}

export default App;