const { Pool } = require('pg');
const pool = new Pool({
  user: 'miguelcruz',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
module.exports = {
  query: (text, params) => pool.query(text, params),
}