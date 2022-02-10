const fs = require("fs");
const Pool = require("pg").Pool;
import isDev from "./isDev";

// user not username!!!!!!
const prodPool = new Pool({
  user: process.env.PROD_DB_USERNAME,
  password: process.env.PROD_DB_PW,
  host: process.env.PROD_DB_HOST,
  port: process.env.PROD_DB_PORT,
  database: process.env.PROD_DB_NAME,
});

const devPool = new Pool({});

export default isDev() ? devPool : prodPool;
