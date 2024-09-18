import React from 'react';
import './../styles/DogCard.css'; // Vi skapar en separat CSS-fil för styling

function DogCard({ dog }) {
     
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