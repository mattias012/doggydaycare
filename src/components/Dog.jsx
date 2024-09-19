import { useLocation } from 'react-router-dom';
import './../styles/Dog.css';

function Dog() {
  const location = useLocation();
  const dog = location.state?.dog; // Get the dog object from the state

  if (!dog) {
    return <p>Dog not found</p>; // If dog is not found in state
  }

  return (
    <div className="dog">
      <h2>{dog.name}</h2>
      <img src={dog.img} alt={dog.name} className="dog-image" />
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age}</p>
      <p>Sex: {dog.sex}</p>
      <p>Chip Number: {dog.chipNumber}</p>
      <p>Owner: {dog.owner.name} {dog.owner.lastName}</p>
      <p>Phone: {dog.owner.phoneNumber}</p>
    </div>
  );
}

export default Dog;