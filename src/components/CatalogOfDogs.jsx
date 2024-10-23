import DogCard from "./DogCard";
import "./../styles/CatalogOfDogs.css";
import FilterBar from "./FilterBar";

function CatalogOfDogs({
  dogs,
  onSearch,
  onFilter,
  currentSearch,
  showCheckedIn,
}) {
  return (
    <div className="container-dogs">
      <FilterBar
        onSearch={onSearch}
        onFilter={onFilter}
        currentSearch={currentSearch}
        showCheckedIn={showCheckedIn}
      />

      <div className="catalog-container">
        {dogs.length === 0 ? (
          <p>No dogs found matching your search or filter criteria.</p> //In case of no results.. maybe should style this..
        ) : (
          <div className="catalog-of-dogs">
            {dogs.map((dog) => (
              <DogCard key={dog.chipNumber} dog={dog} currentFilter={dogs} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CatalogOfDogs;
