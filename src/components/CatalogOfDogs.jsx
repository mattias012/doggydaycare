import React from 'react';
import DogCard from '../components/DogCard';
import './../styles/CatalogOfDogs.css';

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
  return (
    <div className="catalog-of-dogs">
      {dogs.map((dog) => (
        <DogCard key={dog.chipNumber} dog={dog} />
      ))}
    </div>
  );
}

export default CatalogOfDogs;