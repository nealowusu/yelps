CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL
);

INSERT INTO restaurants(name, location, price_range)
VALUES ('Pizza Hut', 'Toronto', 3);
INSERT INTO restaurants (name, location, price_range) VALUES ('Baton Rouge', 'Toronto', 4);



CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurants_id BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT check(rating >=1 and rating <=5) NOT NULL,
    CONSTRAINT connecting_id
        FOREIGN KEY(restaurants_id)
            REFERENCES restaurants(id)
            ON DELETE CASCADE
            
);

INSERT INTO reviews(restaurants_id, name, review, rating)
VALUES(5, 'Neal', 'Really delicious but the wait staff was horrible, and an alligator tried to attack me when I went into the washroom', 2);