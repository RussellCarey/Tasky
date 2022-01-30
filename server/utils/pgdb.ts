const Pool = require("pg").Pool;
import isDev from "./isDev";

const prodPool = new Pool({
  username: "doadmin",
  password: process.env.PROD_DB_PW,
  host: process.env.PROD_DB_HOST,
  port: process.env.PROD_DB_PORT,
  database: process.env.PROD_DB_NAME,
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.CACERT,
  },
});

const devPool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "taskapp",
  password: process.env.DEV_DATABASE_PW,
  port: 6543,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default isDev() ? devPool : prodPool;
