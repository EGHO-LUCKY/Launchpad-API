require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/user");
const Idea = require("./models/idea");
const _ = require("lodash");
const connectDB = require("./config/db");
const userRoute = require("./route/userRoute");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerOptions = require("./swaggerOptions");

const PORT = process.env.PORT || 3000;


// INITIALIZE EXPRESS APP AND USE DEPENDENCIES
const app = express();
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// CONNECT TO MONGODB
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection failed:", err)
    res.json({ message: "Database connection failed" })
  }
});


// API ROUTES
const swaggerSpec = swaggerJsdoc(swaggerOptions(PORT));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", userRoute);



// SERVER

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
  });
}

module.exports = app;
