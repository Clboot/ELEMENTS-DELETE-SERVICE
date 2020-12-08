const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// https://node-postgres.com/features/pooling
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

/**
 * Ne pas oublier le support "ecmaVersion": 8
 */
async function shutdown() {
  console.log("calling end");
  await pool.end();
  console.log("pool has drained");
}

module.exports = {
  pool: pool,
  shutdown: shutdown,
};
