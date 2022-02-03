const dotenv = require("dotenv");
dotenv.config();

const AuthRoutes = require("./routes/authRoutes");
const TasksRoutes = require("./routes/taskRoutes");
const PaymentRoutes = require("./routes/paymentRoutes");
const AccountRoutes = require("./routes/accountRoutes");
const ErrorController = require("./controllers/errorController");

import isDev from "./utils/isDev";
import { createServer } from "./utils/createServer";

// From create server file..
const app = createServer();

//Rooooutes
app.use(!isDev() ? "/taskyapi/auth" : "/api/auth", AuthRoutes);
app.use(!isDev() ? "/taskyapi/tasks" : "/api/tasks", TasksRoutes);
app.use(!isDev() ? "/taskyapi/payment" : "/api/payment", PaymentRoutes);
app.use(!isDev() ? "/taskyapi/account" : "/api/account", AccountRoutes);

//! Routes limites //! Limit certain routes such as signup to x per hour (and more)

// Error handler for all requests etc...
app.use(ErrorController);

app.listen(process.env.PORT, () => {
  console.log(`Connected to server on port ${process.env.PORT}`);
});
