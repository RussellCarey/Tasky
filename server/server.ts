const dotenv = require("dotenv");
dotenv.config();

import express from "express";
import helmet from "helmet";
const app = express();
const cors = require("cors");

const AuthRoutes = require("./routes/authRoutes");
const TasksRoutes = require("./routes/taskRoutes");
const ErrorController = require("./controllers/errorController");

const whiteList = ["localhost:3000", "http://localhost:3000", "http://127.0.0.1:3000"];
app.use(
  cors({
    origin: whiteList,
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json({ limit: "1mb" }));

app.use("/api/auth", AuthRoutes);
app.use("/api/tasks", TasksRoutes);

app.use(ErrorController);

app.listen(process.env.PORT, () => {
  console.log("Connected to server on port ");
});
