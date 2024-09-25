import { useNavigate } from 'react-router-dom';
import './../styles/DogCard.css';
import placeholderImage from './../assets/logo.png';

function DogCard({ dog, currentFilter }) {
  const navigate = useNavigate();

  const handleClick = () => {
    //Navigate to dog detail page and set a state of dog object with filter to remember search term and filters
    navigate(`/dog/${dog.chipNumber}`, { state: { dog, fromFilter: currentFilter } });
  };

  return (
    <div 
      className={`dog-card ${dog.present ? 'checked-in' : ''}`}  //Dynamically add checked-in class if the dog is present or not
      onClick={handleClick}
    >
      <img 
        src={dog.img} 
        alt={dog.name} 
        className="dog-image" 
        onError={(e) => e.target.src = placeholderImage} //In case of failure, we the logo image if the original one fails to load
      />
      <div className="dog-info">
        <h3>{dog.name} ({dog.age} yrs)</h3>
        <p>{dog.breed}</p>
        <button className="details-button" onClick={handleClick}>View Details</button>
      </div>
    </div>
  );
}

export default DogCard;