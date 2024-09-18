import React from 'react';
import DogCard from '../components/DogCard';
import './../styles/CatalogOfDogs.css';
import FilterBar from '../components/FilterBar';
import { useState } from 'react';

const dogs = [
  {
    name: "Molly",
    sex: "female",
    breed: "briard",
    img: "https://images.dog.ceo/breeds/briard/n02105251_6840.jpg",
    present: false,
    age: 4,
    chipNumber: "IEH455006",
    owner: {
      name: "Wilmer",
      lastName: "Svensson",
      phoneNumber: "0769239356"
    }
  },
  {
    name: "Bella",
    sex: "female",
    breed: "labrador",
    img: "https://images.dog.ceo/breeds/labrador/n02099712_3947.jpg",
    present: false,
    age: 1,
    chipNumber: "HPF367168",
    owner: {
      name: "Tina",
      lastName: "Ahlberg",
      phoneNumber: "0732303484"
    }
  }
];

function CatalogOfDogs() {
  const [filteredDogs, setFilteredDogs] = useState(dogs);

  // Hanterar sökningen och skickar sökresultaten till FilterBar via props
  const handleSearch = (searchTerm) => {
    const filtered = dogs.filter(dog => 
      dog.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDogs(filtered);
  };

  // Hanterar sorteringen och skickar det via props till FilterBar
  const handleFilter = (attribute, direction) => {
    let sortedDogs = [...dogs]; // Kopierar hundlistan
    if (direction === 'asc') {
      sortedDogs.sort((a, b) => (a[attribute] > b[attribute] ? 1 : -1)); // Sorterar stigande
    } else if (direction === 'desc') {
      sortedDogs.sort((a, b) => (a[attribute] < b[attribute] ? 1 : -1)); // Sorterar fallande
    } else {
      sortedDogs = dogs; // Återställer till originaldata om ingen sortering
    }
    setFilteredDogs(sortedDogs); // Uppdaterar listan med sorterad data
  };

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