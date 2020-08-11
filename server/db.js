const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "gardenerpostgres",
  host: "localhost",
  port: 5432,
  database: "gardener",
});

module.exports = pool;
