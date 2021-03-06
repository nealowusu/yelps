import React, { useEffect, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let navigate = useNavigate();
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span>0 Reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span> ({restaurant.count})</span>
      </>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <table className='table table-stripped table-hover'>
        <thead>
          <tr>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price Range</th>
            <th scope='col'>Ratings</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant, index) => {
              return (
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                  key={restaurant.id}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      className='btn btn-warning'
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn btn-danger'
                      onClick={(e) => handleDelete(e, restaurant.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

          {/* <tr>
            <td>McDonalds</td>
            <td>New York</td>
            <td>$</td>
            <td>Rating</td>
            <td>
              <button className='btn btn-warning'>Edit</button>
            </td>
            <td>
              <button className='btn btn-danger'>Delete</button>
            </td>
          </tr>
          <tr>
            <td>McDonalds</td>
            <td>New York</td>
            <td>$</td>
            <td>Rating</td>
            <td>
              <button className='btn btn-warning'>Edit</button>
            </td>
            <td>
              <button className='btn btn-danger'>Delete</button>
            </td>
          </tr>
          <tr>
            <td>McDonalds</td>
            <td>New York</td>
            <td>$</td>
            <td>Rating</td>
            <td>
              <button className='btn btn-warning'>Edit</button>
            </td>
            <td>
              <button className='btn btn-danger'>Delete</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
