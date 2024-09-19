import DogCard from '../components/DogCard';
import './../styles/CatalogOfDogs.css';
import FilterBar from '../components/FilterBar';

function CatalogOfDogs({ dogs, onSearch, onFilter, currentSearch, showCheckedIn }) {
  // Log to see if showCheckedIn is received from App.js
  console.log("CatalogOfDogs received showCheckedIn:", showCheckedIn);

  return (
    <div>
      {/* Pass showCheckedIn prop to FilterBar */}
      <FilterBar 
        onSearch={onSearch} 
        onFilter={onFilter} 
        currentSearch={currentSearch}
        showCheckedIn={showCheckedIn}  // Pass showCheckedIn to FilterBar
      />
      <div className="catalog-container">
        <div className="catalog-of-dogs">
          {dogs.map((dog) => (
            <DogCard
              key={dog.chipNumber}
              dog={dog}
              currentFilter={currentSearch}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CatalogOfDogs;