// frontend/src/components/Dealers/SearchCars.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';

const SearchCars = () => {
  const [cars, setCars] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`https://ksundararaja-3030.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/cars/${id}`);
        
        const data = await response.json();

        if (response.status === 200) {
          setCars(data);
        } else {
          console.error('Error fetching cars:', data.error);
        }
      } catch (error) {
        console.error('Error fetching cars:', error.message);
      }
    };

    fetchCars();
  }, [id]);

  return (
    <div>
      <Header />
      <h1>Cars at Dealer ID {id}</h1>
      <div>
        {cars.length === 0 ? (
          <p>Loading cars...</p>
        ) : (
          <div>
            {cars.map((car) => (
              <div key={car._id}>
                <h3>{car.make} {car.model}</h3>
                <p>Year: {car.year}</p>
                <p>Mileage: {car.mileage}</p>
                {/* Add other car details as needed */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div
