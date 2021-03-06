require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db");
const cors = require("cors");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
// ROUTES

// Get all Restartuants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    // const results = await db.query("select * from restaurants");
    const restaurantRatingData = await db.query(
      "select * from restaurants left join (select restaurants_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurants_id) reviews on restaurants.id = reviews.restaurants_id;"
    );
    res.status(200).json({
      status: "success",
      results: restaurantRatingData.rows.length,
      data: {
        restaurants: restaurantRatingData.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

//Get an individual restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await db.query(
      "select * from restaurants left join (select restaurants_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurants_id) reviews on restaurants.id = reviews.restaurants_id where id = $1;",
      [req.params.id]
    );

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurants_id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Create restaurant
app.post("/api/v1/restaurants/", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Update restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: "restaurant",
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

// DELETE restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants WHERE id = $1 ", [
      req.params.id,
    ]);
    console.log(req.params.id);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.error(err.message);
  }
});

//POST REVIEW
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO Reviews (restaurants_id, name, review, rating) values ($1, $2, $3, $4) RETURNING * ;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`server is up and running, and listening to port ${port}`);
});
