// frontend/src/components/Dealers/SearchCars.jsx

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const SearchCars = ({ dealerId }) => {
  // State hooks to manage the values of the dropdowns
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [location, setLocation] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [keywords, setKeywords] = useState('');

  // Hook to access the browser history
  const history = useHistory();

  // Function to handle the search button click
  const handleSearch = () => {
    // Constructing the search query based on the selected values
    const searchQuery = `make=${make}&model=${model}&location=${location}&priceMin=${priceMin}&priceMax=${priceMax}&bodyType=${bodyType}&keywords=${keywords}`;
    
    // Navigating to the search results page with the constructed query
    history.push(`/dealer/${dealerId}/search?${searchQuery}`);
  };

  return (
    <div>
      {/* Dropdown for Make */}
      <select value={make} onChange={(e) => setMake(e.target.value)}>
        {/* Options for Make */}
        <option value="">Select Make</option>
        <option value="Toyota">Toyota</option>
        {/* Add other make options as needed */}
      </select>

      {/* Dropdown for Model */}
      <select value={model} onChange={(e) => setModel(e.target.value)}>
        {/* Options for Model */}
        <option value="">Select Model</option>
        {/* Add other model options as needed */}
      </select>

      {/* Dropdown for Location */}
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        {/* Options for Location */}
        <option value="">Select Location</option>
        {/* Add other location options as needed */}
      </select>

      {/* Dropdown for Price Min */}
      <select value={priceMin} onChange={(e) => setPriceMin(e.target.value)}>
        {/* Options for Price Min */}
        <option value="">Select Min Price</option>
        {/* Add other price options as needed */}
      </select>

      {/* Dropdown for Price Max */}
      <select value={priceMax} onChange={(e) => setPriceMax(e.target.value)}>
        {/* Options for Price Max */}
        <option value="">Select Max Price</option>
        {/* Add other price options as needed */}
      </select>

      {/* Dropdown for Body Type */}
      <select value={bodyType} onChange={(e) => setBodyType(e.target.value)}>
        {/* Options for Body Type */}
        <option value="">Select Body Type</option>
        {/* Add other body type options as needed */}
      </select>

      {/* Dropdown for Keywords */}
      <input
        type="text"
        placeholder="Keywords"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />

      {/* Button to trigger the search */}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchCars;
