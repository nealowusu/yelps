import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setName(response.data.data.restaurant.name);
        setLocation(response.data.data.restaurant.location);
        setPriceRange(response.data.data.restaurant.price_range);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    console.log(updatedRestaurant);
    navigate("/");
  };

  return (
    <div>
      <form action=''>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            value={name}
            className='form-control'
            id='name'
            type='text'
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            value={location}
            className='form-control'
            id='location'
            type='text'
            onChange={(e) => setLocation(e.target.value)}
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='price_range'>Price Range</label>
          <input
            value={priceRange}
            className='form-control'
            id='price_range'
            type='number'
            onChange={(e) => setPriceRange(e.target.value)}
          ></input>
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
