const Pool = require("pg").Pool;
import isDev from "./isDev";

const prodPool = new Pool({
  connectionString: process.env.PROD_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const devPool = new Pool({
  host: "localhost",
  user: "postgres",
  password: process.env.DEV_DATABASE_PW,
  port: 6543,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = isDev() ? devPool : prodPool;
