import { useLocation, Link } from 'react-router-dom';
import './../styles/Dog.css';
import placeholderImage from './../assets/logo.png';

function Dog() {
  const location = useLocation();
  const dog = location.state?.dog; // Get the dog object from the state

  if (!dog) {
    return <p>Dog not found</p>; // If dog is not found in state
  }

  return (
    <div className="dog-container">
      <div className="dog">
      <Link to="/catalogOfDogs"> 
        <button className="back-button">
        &#8592; Back to Catalog
        </button>
      </Link>
      <hr />
        <h2>
          {dog.name}
          <span className={`status-dot ${dog.present ? 'green' : 'red'}`}></span>
        </h2>
        <img src={dog.img} 
             alt={dog.name} 
             className="dog-detail-image"  
             onError={(e) => e.target.src = placeholderImage} />
        <p><span>Breed:</span> {dog.breed}</p>
        <p><span>Age:</span> {dog.age}</p>
        <p><span>Sex:</span> {dog.sex}</p>
        <p><span>Chip Number:</span> {dog.chipNumber}</p>
        <p><span>Owner:</span> {dog.owner.name} {dog.owner.lastName}</p>
        <p><span>Phone:</span> {dog.owner.phoneNumber}</p>
      </div>
    </div>
  );
}

export default Dog;
