const { Pool } = require('pg');
const properties = require('./json/properties.json');
const users = require('./json/users.json');
const pool = new Pool({
  user: 'miguelcruz',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = async email => {
  const queryString = `SELECT * FROM users WHERE email=$1;`;
  const values = [email];
  try {
    const users = await pool.query(queryString, values);
    let found = users.rows.filter(u => u.email === email);
    return found[0];
  } catch (err) {
    console.error('query error', err.stack);
  }
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = async id => {
  const queryString = `SELECT * FROM users WHERE id=$1;`;
  const values = [id];
  try {
    const users = await pool.query(queryString, values);
    let found = users.rows.filter(u => u.id === id);
    return found[0];
  } catch (err) {
    console.error('query error', err.stack);
  }
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = async  user => {
  const queryString = `INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3) RETURNING *;`;
  const values = [user.name, user.email, user.password];
  try {
    const inserted = await pool.query(queryString, values);
    return inserted;
  } catch (err) {
    console.error('query error', err.stack);
  }
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = async (guestId, limit = 10) => {
  console.log('limit', limit);
  const queryString = `SELECT p.id, p.title, p.cost_per_night, r.start_date, r.guest_id, p.thumbnail_photo_url, AVG(pr.rating) average_rating
                          FROM properties p
                          JOIN reservations r
                          ON p.id=r.property_id
                          JOIN property_reviews pr
                          ON 	pr.property_id=p.id
                          WHERE r.end_date < now()::date AND r.guest_id=$1
                          GROUP BY p.id, r.start_date, r.guest_id, r.end_date
                          ORDER BY r.start_date
                          LIMIT $2;`;
  // return getAllProperties(null, 2);
  const values = [guestId, limit];
  try {
    const reservations = await pool.query(queryString, values);
    return reservations.rows;
  } catch (err) {
    console.error('query error', err.stack);
  }
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = async (options, limit = 10) => {
  const queryString = `SELECT * FROM properties LIMIT $1`;
  const values = [limit];
  try {
    const limitedProperties = {};
    const properties = await pool.query(queryString, values);
    for (let i = 1; i <= limit; i++) {
      limitedProperties[i] = properties.rows[i];
    }
    return Promise.resolve(limitedProperties);
  } catch (err) {
    console.error('query error', err.stack);
  }
};
exports.getAllProperties = getAllProperties;
  


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
