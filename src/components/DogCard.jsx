import { useNavigate } from 'react-router-dom';
import './../styles/DogCard.css';

function DogCard({ dog, currentFilter }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Navigating to dog detail with state: ", { dog, fromFilter: currentFilter });
    navigate(`/dog/${dog.chipNumber}`, { state: { dog, fromFilter: currentFilter } });
  };

  return (
    <div 
    className={`dog-card ${dog.present ? 'checked-in' : ''}`}  // Dynamically add 'checked-in' class if present is true
    onClick={handleClick}
    >
      <img src={dog.img} alt={dog.name} className="dog-image" />
      <div className="dog-info">
        <h3>{dog.name}</h3>
        <p>Breed: {dog.breed}</p>
        <p>Age: {dog.age} years</p>
        <button className="details-button" onClick={handleClick}>View Details</button>
      </div>
    </div>
  );
}

export default DogCard;