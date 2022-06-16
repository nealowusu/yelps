import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  return (
    <div className='container'>
      <div className='row'>
        {reviews.map((review) => {
          return (
            <div className='col-sm-4' key={review.id}>
              <div
                className='card text-white bg-primary mb-3'
                style={{ maxwidth: "18rem" }}
              >
                <div className='card-body'>
                  <h5 className='card-title'>{review.name}</h5>
                  <span>
                    <StarRating rating={review.rating} />
                  </span>
                  <p className='card-text'>{review.review}</p>
                </div>
              </div>
            </div>
          );
        })}
        {/* <div
            className='card text-white bg-primary mb-3'
            style={{ maxwidth: "18rem" }}
          >
            <div className='card-body'>
              <h5 className='card-title'>Joane</h5>
              <span>
                <StarRating rating={3} />
              </span>
              <p className='card-text'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default Reviews;
