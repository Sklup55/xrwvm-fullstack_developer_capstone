// frontend/src/components/Dealers/SearchCars.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';

const SearchCars = () => {
  const [cars, setCars] = useState([]);
  const { id } = useParams();

  // let curr_url = window.location.href;
  // let root_url = curr_url.substring(0,curr_url.indexOf("dealer"));
  let dealer_url = `djangoapp/get_inventory/${id}`;
  
  const fetchCars = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer)
      setCars(dealerobjs)
    }
  }



  useEffect(() => {
    fetchCars();
  },[]); 

  return (
    <div>
      <Header />
      <h1>Cars at Dealer ID {id}</h1>
      <div>
        {cars.length === 0 ? (
          <p>Loading cars...</p>
        ) : (
          <div>
            {/* {cars.map((car) => (
              <div key={car._id}>
                <h3>{car.make} {car.model}</h3>
                <p>Year: {car.year}</p>
                <p>Mileage: {car.mileage}</p>
              </div>
            ))} */}
            {cars}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCars;