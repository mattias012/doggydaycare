import { useNavigate } from 'react-router-dom';
import './../styles/DogCard.css';

function DogCard({ dog, currentFilter }) {
  const navigate = useNavigate();

  const handleClick = () => {
    //Navigate to dog detail page and set a state of dog object with filter to remember searchterm and filters
    navigate(`/dog/${dog.chipNumber}`, { state: { dog, fromFilter: currentFilter } });
  };

  return (
    <div 
    className={`dog-card ${dog.present ? 'checked-in' : ''}`}  //Dynamically add checkedIn if present is true, green border
    onClick={handleClick}
    >
      <img src={dog.img} alt={dog.name} className="dog-image" />
      <div className="dog-info">
        <h3>{dog.name} ({dog.age}y)</h3>
        <p>{dog.breed}</p>
        <button className="details-button" onClick={handleClick}>View Details</button>
      </div>
    </div>
  );
}

export default DogCard;