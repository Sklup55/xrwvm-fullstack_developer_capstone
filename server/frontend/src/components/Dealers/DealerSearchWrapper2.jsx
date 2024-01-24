// frontend/src/components/Dealers/DealerSearchWrapper.jsx

import React from 'react';
import SearchCars from './SearchCars';

const DealerSearchWrapper = ({ dealerId }) => {
  return (
    <div>
      {/* Heading for the search section */}
      <h2>Search Cars in this Dealership</h2>
      
      {/* Render the SearchCars component */}
      <SearchCars dealerId={dealerId} />
    </div>
  );
};

export default DealerSearchWrapper;
