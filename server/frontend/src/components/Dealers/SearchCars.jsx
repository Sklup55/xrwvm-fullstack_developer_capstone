import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';

const SearchCars = () => {
  const [cars, setCars] = useState([]);
  const [dealer, setDealer] = useState({"full_name":""});
  const [message, setMessage] = useState("Loading Cars....");
  const { id } = useParams();


  let dealer_url = `/djangoapp/get_inventory/${id}`;

  let fetch_url = `/djangoapp/dealer/${id}`;
  
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


  const fetchDealer = async ()=>{
    const res = await fetch(fetch_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
        console.log("adfa", retobj)
      let dealer = Array.from(retobj.dealer)
      setDealer(dealer[0])
    }
  }

   let SearchCarsByModel = async ()=> {

    let model = document.getElementById("model").value;
    let make = document.getElementById("make").value;
    let year = document.getElementById("year").value;
    let mileage = document.getElementById("mileage").value;

    let searchctx = model != ""? "model="+model : make != ""? "make="+make : mileage != ""? "mileage="+mileage : year != ""? "year="+year : ""; 
    dealer_url = dealer_url + "?"+searchctx;

    const res = await fetch(dealer_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }})

      const retobj = await res.json();
      
      if(retobj.status === 200) {
          console.log(retobj)
          document.getElementById("model").value = "";
          document.getElementById("make").value = "";
          document.getElementById("year").value = "";
          document.getElementById("mileage").value = "";
        let cars = Array.from(retobj.cars)
        if(cars.length === 0) {
          setMessage("No cars found matching criteria");
        }
        setCars(cars)
      }

   }


  useEffect(() => {
    fetchCars();
  },[]); 

  return (
    <div>
      <Header />
      <h1>Cars at {dealer.full_name}</h1>
      <input style={{ marginLeft: '10px', marginRight: '10px' }} type="text" id="model" name="model" placeholder='Model'/>
      <input style={{ marginLeft: '10px', marginRight: '10px' }} type="text" id="make" name="make" placeholder='Make'/>
      <input style={{ marginLeft: '10px', marginRight: '10px' }} type="text" id="year" name="year" placeholder='Year'/>
      <input style={{ marginLeft: '10px', marginRight: '10px' }} type="text" id="mileage" name="mileage" placeholder='Mileage'/>
      <button onClick={SearchCarsByModel}>Search</button>
      <div style={{ marginLeft: '10px', marginRight: '10px' , marginTop: '20px'}} >
        {cars.length === 0 ? (
          <p style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>{message}</p>
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