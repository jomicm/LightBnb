// const { db } = require('pg');
// const properties = require('./json/properties.json');
// const users = require('./json/users.json');
// const db = new db({
//   user: 'miguelcruz',
//   password: '123',
//   host: 'localhost',
//   database: 'lightbnb'
// });
const db = require('./db');
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
    const users = await db.query(queryString, values);
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
    const users = await db.query(queryString, values);
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
    const inserted = await db.query(queryString, values);
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
const getAllReservations = async(guestId, limit = 10) => {
  console.log('RESERVATIONS>>>', guestId);
  const queryString = `SELECT p.id, p.title, p.cost_per_night, r.start_date, r.guest_id, p.thumbnail_photo_url, AVG(pr.rating) average_rating
                          FROM properties p
                          JOIN reservations r
                          ON p.id=r.property_id
                          LEFT JOIN property_reviews pr
                          ON 	pr.property_id=p.id
                          WHERE r.end_date >= now()::date AND r.guest_id=$1
                          GROUP BY p.id, r.start_date, r.guest_id, r.end_date
                          ORDER BY r.start_date
                          LIMIT $2;`;
  // return getAllProperties(null, 2);
  const values = [guestId, limit];
  try {
    const reservations = await db.query(queryString, values);
    console.log('reservations', reservations.rows);
    return reservations.rows;
  } catch (err) {
    console.error('query error', err.stack);
  }
};
exports.getAllReservations = getAllReservations;

const addReservation = async (propertyId, startDate, endDate, userId) => {
  console.log('Now from database!!!', propertyId, startDate, endDate, userId);
  const queryString = `INSERT INTO reservations (start_date, end_date, property_id, guest_id) 
    VALUES ($1, $2, $3, $4) RETURNING *;`;
  const values = [startDate, endDate, propertyId, userId];
  try {
    const newReservastion = await db.query(queryString, values);
    return newReservastion.rows[0];
  } catch (err) {
    console.error('query error', err.stack);
  }
};
exports.addReservation = addReservation;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = async(options, limit = 10) => {
  let queryParams = [];
  // const possibleFields  = {city:options.city, owner_id:options.owner_id, minimum_price_per_night:options.minimum_price_per_night, maximum_price_per_night:options.maximum_price_per_night};
  // const possibleComparison = {city:'LIKE', owner_id:'=', minimum_price_per_night:'<=', maximum_price_per_night:'>='};
  let queryString = `SELECT p.*, AVG(pr.rating) average_rating
                          FROM properties p
                          LEFT JOIN property_reviews pr
                          ON pr.property_id=p.id
                          `;
  // Object.keys(possibleFields).map(fieldKey => {
  //   [queryString, queryParams] = buildPropQuery(queryString, fieldKey, possibleFields[fieldKey], queryParams, possibleComparison[fieldKey]);
  // });
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE p.city LIKE $${queryParams.length}`;
  }
  console.log('queryParams', queryParams);
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += ` ${queryParams.length ? 'WHERE' : 'AND'} p.owner_id = $${queryParams.length}`;
  }
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += ` ${!queryParams.length ? 'WHERE' : 'AND'} p.cost_per_night >= $${queryParams.length}*100`;
  }
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += ` ${!queryParams.length ? 'WHERE' : 'AND'} p.cost_per_night <= $${queryParams.length}*100`;
  }
  queryString += ` GROUP BY p.id`;
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += ` HAVING AVG(pr.rating) >= $${queryParams.length}`;
  }
  queryParams.push(limit);
  queryString += ` ORDER BY p.cost_per_night
                    LIMIT $${queryParams.length};`;
  try {
    const limitedProperties = {};
    const properties = await db.query(queryString, queryParams);
    console.log('queryString, queryParams', queryString, queryParams);
    properties.rows.map((p, ix) => limitedProperties[ix] = p);
    return limitedProperties;
  } catch (err) {
    console.error('query error', err.stack);
  }
};
exports.getAllProperties = getAllProperties;

const buildPropQuery = (queryString, fieldKey, fieldValue, queryParams, comparison) => {
  console.log('queryParams', queryParams.length);
  if (fieldValue) {
    queryParams.push(comparison !== 'LIKE' ? fieldValue : '%' + fieldValue + '%');
    queryString += ` ${!queryParams.length ? 'WHERE' : 'AND'} p.${fieldKey} ${comparison} $${queryParams.length} `;
    console.log('queryString', queryString);
  }
  return [queryString, queryParams];
};


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = async property => {
  const queryString = `INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,street,city,province,post_code,country,parking_spaces,number_of_bathrooms,number_of_bedrooms) 
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *;`;
  const values = [property.owner_id,property.title,property.description,property.thumbnail_photo_url,property.cover_photo_url,property.cost_per_night,property.street,property.city,property.province,property.post_code,property.country,property.parking_spaces,property.number_of_bathrooms,property.number_of_bedrooms];
  try {
    const inserted = await db.query(queryString, values);
    console.log('PROPERTY inserted', inserted);
    return inserted;
  } catch (err) {
    console.error('query error', err.stack);
  }
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
};
exports.addProperty = addProperty;
