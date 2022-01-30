const dotenv = require("dotenv");
dotenv.config();

import express from "express";
import helmet from "helmet";
import isDev from "./utils/isDev";
const app = express();
const cors = require("cors");

const AuthRoutes = require("./routes/authRoutes");
const TasksRoutes = require("./routes/taskRoutes");
const PaymentRoutes = require("./routes/paymentRoutes");
const AccountRoutes = require("./routes/accountRoutes");
const StripeController = require("./controllers/stripeController");

const ErrorController = require("./controllers/errorController");

const whiteListDev = ["localhost:3000", "http://localhost:3000", "http://127.0.0.1:3000"];
const whiteListProd = [
  "https://tasky.russell-carey.com",
  "https://tasky.russell-carey.com/taskyapi",
  "https://www.tasky.russell-carey.com",
  "localhost:3002",
];

app.use(
  cors({
    origin: isDev() ? whiteListDev : whiteListProd,
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json({ limit: "1mb" }));

app.use(!isDev() ? "/taskyapi/auth" : "/api/auth", AuthRoutes);
app.use(!isDev() ? "/taskyapi/tasks" : "/api/tasks", TasksRoutes);
app.use(!isDev() ? "/taskyapi/payment" : "/api/payment", PaymentRoutes);
app.use(!isDev() ? "/taskyapi/account" : "/api/account", AccountRoutes);

// Error handler for all requests etc...
app.use(ErrorController);

app.listen(process.env.PORT, () => {
  console.log(`Connected to server on port ${process.env.PORT}`);
});
