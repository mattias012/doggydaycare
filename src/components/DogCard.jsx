import React from 'react';
import './../styles/DogCard.css'; // Vi skapar en separat CSS-fil för styling

function DogCard({ dog }) {

    const dogExample = {
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
      };

      
  return (
    <div className="dog-card">
      <img src={dog.img} alt={dog.name} className="dog-image" />
      <div className="dog-info">
        <h3>{dog.name}</h3>
        <p>Breed: {dog.breed}</p>
        <p>Age: {dog.age} years</p>
        <button className="details-button">View Details</button>
      </div>
    </div>
  );
}

export default DogCard;