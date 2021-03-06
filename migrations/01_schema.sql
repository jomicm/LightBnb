DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS rates;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS guest_reviews;
DROP TABLE IF EXISTS property_reviews;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE properties (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_photo_url TEXT NOT NULL,
  cover_photo_url TEXT NOT NULL,
  cost_per_night INTEGER NOT NULL DEFAULT 0,
  street TEXT NOT NULL,
  parking_spaces SMALLINT NOT NULL DEFAULT 0,
  number_of_bathrooms SMALLINT NOT NULL DEFAULT 0,
  number_of_bedrooms SMALLINT NOT NULL DEFAULT 0,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  post_code TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE rates (
  id SERIAL PRIMARY KEY NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  cost_per_night INTEGER NOT NULL,
  property_id INTEGER NOT NULL REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  guest_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE guest_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  guest_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reservation_id INTEGER NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  rating TEXT NOT NULL,
  message TEXT NOT NULL
);

CREATE TABLE property_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  guest_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reservation_id INTEGER NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  property_id INTEGER NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  rating TEXT NOT NULL,
  message TEXT NOT NULL
);