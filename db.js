// const { Pool } = require("pg");
// require("dotenv").config();

// const isProduction = process.env.NODE_ENV === "production";
// const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//   ssl: isProduction
//     ? {
//         rejectUnauthorized: true,
//       }
//     : {
//         rejectUnauthorized: false,
//       },
// });

// pool.on("connect", () => {
//   console.log("Connected to the PostgreSQL database todo");
// });

// pool.on("error", (err) => {
//   console.error("Error connecting to PostgreSQL database:", err);
// });

// module.exports = pool;

const { Pool } = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction
    ? {
        rejectUnauthorized: true,
      }
    : {
        rejectUnauthorized: false,
      },
});

pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database todo");
});

pool.on("error", (err) => {
  console.error("Error connecting to PostgreSQL database:", err);
});

module.exports = pool;
