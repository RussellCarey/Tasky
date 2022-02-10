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
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.PROD_DB_CA,
  },
});

const devPool = new Pool({
  host: "139.59.195.97",
  user: "postgres",
  database: "tasky",
  password: "Fromthedepths1122!!",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default isDev() ? devPool : prodPool;
