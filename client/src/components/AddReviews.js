import React, { useState } from "react";

const AddReview = () => {
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  return (
    <div className='container'>
      <div className='row'>
        <form action=''>
          <div className='form-row'>
            <div className='form-group col-8 pe-2'>
              <label htmlFor='name'>Name</label>
              <input
                className='form-control'
                type='text'
                id='name'
                placeholder='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='form-group col-4'>
              <label htmlFor='Rating'>Rating</label>
              <select
                id='rating'
                className='form-control'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option disabled>Rating</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='review'>Review</label>
            <textarea
              id='Review'
              className='form-control'
              rows='10'
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>
          <button className='btn btn-primary'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
