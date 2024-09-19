import DogCard from '../components/DogCard';
import './../styles/CatalogOfDogs.css';
import FilterBar from '../components/FilterBar';

function CatalogOfDogs({ dogs, onSearch, onFilter, currentSearch }) {
  return (
    <div>
      {/* FilterBar component receives search and filter props */}
      <FilterBar onSearch={onSearch} onFilter={onFilter} currentSearch={currentSearch} />
      <div className="catalog-container">
        <div className="catalog-of-dogs">
          {dogs.map((dog) => (
            <DogCard
              key={dog.chipNumber}
              dog={dog}
              currentFilter={currentSearch} // Send current filter down to DogCard
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CatalogOfDogs;