const express = require("express");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const passportServer = require("passport");
const cors = require("cors");
const app = express();

require("dotenv").config();
require("./controllers/twitterSetup.ts");

const ErrorController = require("./controllers/errorController");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const { ENode } = require("./types/enums");
import isDev from "./utils/isDev";

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 30, // limit each IP to X amount requests per windowMs
  message: "You have reached your post limit, please wait one hour.",
});

app.use(
  cors({
    credentials: true, // allow session cookie from browser to pass through
    origin: process.env.NODE_ENV === ENode.prod ? process.env.PROD_URL : process.env.DEV_URL,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === ENode.dev ? false : false,
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: process.env.NODE_ENV === ENode.dev ? false : false,
      sameSite: process.env.NODE_ENV === ENode.dev ? "lax" : "lax",
    },
  })
);

// Filters and limits..
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, parameterLimit: 10, limit: "10mb" }));

app.use(passportServer.initialize());
app.use(passportServer.session());

// Limit amount of post someone can do in a space of time.. (to stop spamming)
app.use(!isDev() ? "/tweetyapi/post/message" : "/api/post", limiter);

// Customize routes depending on dev or prod.
app.use(!isDev() ? "/tweetyapi/auth" : "/api/auth", authRoutes);
app.use(!isDev() ? "/tweetyapi/post" : "/api/post", postRoutes);

// Catch any error and send to the error controller..
app.use(ErrorController);

//? App listen start
app.listen(process.env.PORT, () => {
  console.log("Connected to server!");
});
