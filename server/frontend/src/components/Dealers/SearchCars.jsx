import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';

const SearchCars = () => {
  const [allCars, setAllCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [dealer, setDealer] = useState({"full_name":""});
  const [message, setMessage] = useState("Loading Cars....");
  const { id } = useParams();


  let dealer_url = `/djangoapp/get_inventory/${id}`;

  let fetch_url = `/djangoapp/dealer/${id}`;
  
  const fetchDealer = async ()=>{
    const res = await fetch(fetch_url, {
      method: "GET"
    });
    const retobj = await res.json();
    if(retobj.status === 200) {
      let dealer = retobj.dealer;
      console.log(dealer);
      setDealer({"full_name":dealer[0].full_name})
    }
  }

  const populateMakesAndModels = (cars)=>{
    let tmpmakes = []
    let tmpmodels = []
    cars.forEach((car)=>{
      tmpmakes.push(car.make)
      tmpmodels.push(car.model)
    })
    setMakes(Array.from(new Set(tmpmakes)));
    setModels(Array.from(new Set(tmpmodels)));
  }
    

  const fetchCars = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
        console.log("adfa", retobj)
      let cars = Array.from(retobj.cars)
      setCars(cars);
      setAllCars(cars);
      populateMakesAndModels(cars);
    }
  }


  let SearchCarsByMake = async ()=> {
    let make = document.getElementById("make").value;
    dealer_url = dealer_url + "?make="+make;

    const res = await fetch(dealer_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }})

      const retobj = await res.json();
      
      if(retobj.status === 200) {
        let cars = Array.from(retobj.cars)
        if(cars.length === 0) {
          setMessage("No cars found matching criteria");
        } else {
          setCars(cars);
      }
   }
  }

   let SearchCarsByModel = async ()=> {
    let model = document.getElementById("model").value;
    dealer_url = dealer_url + "?model="+model;

    const res = await fetch(dealer_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }})

      const retobj = await res.json();
      
      if(retobj.status === 200) {
        let cars = Array.from(retobj.cars)
        if(cars.length === 0) {
          setMessage("No cars found matching criteria");
        } else {
          setCars(cars);
      }
   }
  }

  let SearchCarsByYear = async ()=> {
    let year = document.getElementById("year").value;
    dealer_url = dealer_url + "?year="+year;

    const res = await fetch(dealer_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }})

      const retobj = await res.json();
      
      if(retobj.status === 200) {
        let cars = Array.from(retobj.cars)
        if(cars.length === 0) {
          setMessage("No cars found matching criteria");
        } else {
          setCars(cars);
      }
   }
  }

  let SearchCarsByMileage = async ()=> {
    
    let mileage = document.getElementById("mileage").value;
    dealer_url = dealer_url + "?mileage="+mileage;

    const res = await fetch(dealer_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }})

      const retobj = await res.json();
      
      if(retobj.status === 200) {
        let cars = Array.from(retobj.cars)
        if(cars.length === 0) {
          setMessage("No cars found matching criteria");
        } else {
        document.getElementById('make').selectedIndex = 0;
        document.getElementById('model').selectedIndex = 0;
          setCars(cars);
      }
   }
  }


  let SearchCarsByPrice = async ()=> {
    let price = document.getElementById("price").value;
    dealer_url = dealer_url + "?price="+price;

    const res = await fetch(dealer_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }})

      const retobj = await res.json();
      
      if(retobj.status === 200) {
        let cars = Array.from(retobj.cars)
        if(cars.length === 0) {
          setMessage("No cars found matching criteria");
        } else {
            document.getElementById('make').selectedIndex = 0;
            document.getElementById('model').selectedIndex = 0;
          setCars(cars);
      }
   }
  }



  useEffect(() => {
    fetchCars();
    fetchDealer();
  },[]); 

  return (
    <div>
      <Header />
      <h1 style={{ marginBottom: '20px'}}>Cars at {dealer.full_name}</h1>
      <div>
      <span style={{ marginLeft: '10px', paddingLeft: '10px'}}>Make</span>
      <select style={{ marginLeft: '10px', marginRight: '10px' ,paddingLeft: '10px', borderRadius :'10px'}} name="make" id="make" onChange={SearchCarsByMake}>
        {makes.length === 0 ? (
          <option value=''>No data found</option>
        ):(
          <>
          <option disabled defaultValue> -- All -- </option>
          {makes.map((make, index) => (
            <option key={index} value={make}>
              {make}
            </option>
          ))}
        </>
        )        
        }
      </select>
      <span style={{ marginLeft: '10px', paddingLeft: '10px'}}>Model</span>
      <select style={{ marginLeft: '10px', marginRight: '10px' ,paddingLeft: '10px', borderRadius :'10px'}} name="model" id="model" onChange={SearchCarsByModel}>
      {models.length === 0 ? (
        <option value=''>No data found</option>
      ) : (
        <>
          <option disabled defaultValue> -- All -- </option>
          {models.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </>
      )}      
      </select>
      <span style={{ marginLeft: '10px', paddingLeft: '10px'}}>Not older than</span>
      <select style={{ marginLeft: '10px', marginRight: '10px' ,paddingLeft: '10px', borderRadius :'10px'}} name="year" id="year" onChange={SearchCarsByYear}>
          <option disabled selected value> -- select an option -- </option>
          <option value='2024'>2024</option>
          <option value='2023'>2023</option>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
      </select>
      <span style={{ marginLeft: '10px', paddingLeft: '10px'}}>Mileage</span>
      <select style={{ marginLeft: '10px', marginRight: '10px' ,paddingLeft: '10px', borderRadius :'10px'}} name="mileage" id="mileage" onChange={SearchCarsByMileage}>
          <option disabled selected value> -- select an option -- </option>
          <option value='50000'>Under 50000</option>
          <option value='100000'>50000 - 100000</option>
          <option value='150000'>100000 - 150000</option>
          <option value='200000'>150000 - 200000</option>
          <option value='200001'>Over 200000</option>
      </select>
      <span style={{ marginLeft: '10px', paddingLeft: '10px'}}>Price</span>
      <select style={{ marginLeft: '10px', marginRight: '10px' ,paddingLeft: '10px', borderRadius :'10px'}} name="mileage" id="mileage" onChange={SearchCarsByPrice}>
          <option disabled selected value> -- select an option -- </option>
          <option value='20000'>Under 20000</option>
          <option value='40000'>20000 - 40000</option>
          <option value='60000'>40000 - 60000</option>
          <option value='80000'>60000 - 80000</option>
          <option value='80001'>Over 80000</option>
      </select>



      </div>


      <div style={{ marginLeft: '10px', marginRight: '10px' , marginTop: '20px'}} >
        {cars.length === 0 ? (
          <p style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>{message}</p>
        ) : (
          <div>
            <hr/>
            {cars.map((car) => (
              <div>
              <div key={car._id}>
                <h3>{car.make} {car.model}</h3>
                <p>Year: {car.year}</p>
                <p>Mileage: {car.mileage}</p>
              </div>
              <hr/>
              </div>
            )
        )}

          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCars;