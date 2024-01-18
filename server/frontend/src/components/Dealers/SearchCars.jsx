// frontend/src/components/Dealers/SearchCars.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';

const SearchCars = () => {
  const [cars, setCars] = useState([]);
  const { id } = useParams();


  let dealer_url = `/djangoapp/get_inventory/${id}`;
  
  const fetchCars = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
        console.log("adfa", retobj)
      let cars = Array.from(retobj.cars)
      setCars(cars)
    }
  }

   let SearchCarsByModel = async ()=> {
    alert("Hi")
    let model = document.getElementById("model").value;
    alert("model name", model)

    const res = await fetch(dealer_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

        body: {"model":model}})

      const retobj = await res.json();
      
      if(retobj.status === 200) {
          console.log("adfa", retobj)
        let cars = Array.from(retobj.cars)
        setCars(cars)
      }

   }


  useEffect(() => {
    fetchCars();
  },[]); 

  return (
    <div>
      <Header />
      <h1>Cars at Dealer ID {id}</h1>
      <input type="text" id="model" name="model" />
      <button onClick="SearchCarsByModel()">Click me</button>
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
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCars;