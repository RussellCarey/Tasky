const dotenv = require("dotenv");
dotenv.config();
import { createRouteLimit } from "./utils/routeLimiter";

const AuthRoutes = require("./routes/authRoutes");
const TasksRoutes = require("./routes/taskRoutes");
const PaymentRoutes = require("./routes/paymentRoutes");
const AccountRoutes = require("./routes/accountRoutes");
const ErrorController = require("./controllers/errorController");

import isDev from "./utils/isDev";
import { createServer } from "./utils/createServer";

// From create server file..
const app = createServer();

// Limit amount of post someone can do in a space of time.. (minutes, requests, message).
app.use("/api/tasks", createRouteLimit(60, 60, "You have made too many requests. Please wait one hour and try again."));
app.use("/api/auth/signup", createRouteLimit(60, 2, "You have made too many signup requests."));

//Rooooutes
app.use(!isDev() ? "/taskyapi/auth" : "/api/auth", AuthRoutes);
app.use(!isDev() ? "/taskyapi/tasks" : "/api/tasks", TasksRoutes);
app.use(!isDev() ? "/taskyapi/payment" : "/api/payment", PaymentRoutes);
app.use(!isDev() ? "/taskyapi/account" : "/api/account", AccountRoutes);

// Error handler for all requests etc...
app.use(ErrorController);

app.listen(process.env.PORT, () => {
  console.log(`Connected to server on port ${process.env.PORT}`);
});
