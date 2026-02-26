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

// INITIALIZE EXPRESS APP AND USE DEPENDENCIES
const app = express();
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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
app.get("/", (req, res) => {
    res.send("Register and/or login to use this platform");
});

app.post("/register", async (req, res, next) => {
    try {
        const username = req.body.email;
        const fullName = req.body.username;
        const password = req.body.password;

        if (!username || !fullName || !password) {
            return res.json({ message: "Missing Credentials" });
        };

        const user = await User.register({
            username,
            fullName,
        }, password);

        req.login(user, (err) => {
            if (err) {
                next(err);
                return res.json({ message: "Login after registration failed", error: err });
            }
            // Success 
            res.json({ message: "Registration and login successful", user: req.user.fullName });
        });
    } catch (err) {
        if (err.name === "UserExistsError") {
            return res.json({ message: "Email already exist" });
        };
        next(err);
        return res.json({ message: "Failed to create user" });;
    }
});


app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.json({ message: info });
    }

    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "Logged in successfully", user: req.user.fullName });
    });
  })(req, res, next);
});


app.get("/logout", (req, res) => {
  if (!req.user) return res.json({message: "No User is logged in"});
  const user = req.user;
  req.logout(err=>{
    if (err) next(err);
  });
  res.json({ message: "Logged out Successfully", username: user.fullName })
});

app.route("/:user/ideas")
  .get(async (req, res) => {
    const fullName = _.lowerCase(req.params.user);
    if (req.isAuthenticated()){
      if (_.lowerCase(req.user.fullName) === fullName){
        // Pass code here
        const ideas = await Idea.find();
        return res.send(ideas);
      } else return res.json({message: `No Authentication found for ${fullName}`});
    };
    res.json({message: `No Authentication found for ${fullName}`});
  })

  .put(async (req, res) => {
    if (!req.isAuthenticated()){
      return res.json({message: "Not Authenticated"});
    }

    const {title, category, shortDescription, fullDescription} = req.body;

    if (!title || !category || !shortDescription || !fullDescription){
      return res.json({message: "Missing Idea field(s)"});
    }

    try {
      // console.log(req.session);
      const idea = await Idea.create({
        author: req.user.fullName,
        authorId: req.user._id,
        title,
        category,
        shortDescription,
        fullDescription
      });

      return res.json({message: "Idea Created Successfully", idea})
    } catch(err){
      console.log(err);
      return res.json({message: "Error Creating Idea"});
    }
  });

app.route("/:user/ideas/:ideaId")
  .get(async (req, res) => {
    if (!req.isAuthenticated()){
      return res.json({message: "User not Authenticated"});
    }
    
    const {user, ideaId} = req.params;
    if (user !== req.user.fullName){
      return res.json({message: `${user} is not Authenticated`});
    }

    const idea = await Idea.findOne({_id: ideaId});
    if (!idea){
      return res.json({message: `Idea with _id: ${ideaId} not found`});
    }
    return res.json(idea);
  })

  .delete(async (req, res) => {
    if (!req.isAuthenticated()){
      return res.json({message: "User not Authenticated"})
    }

    const {user, ideaId} = req.params;
    if (user !== req.user.fullName){
      return res.json({message: `${user} is not Authenticated`});
    }

    const idea = await Idea.findOne({_id: ideaId});
    if (idea){
      if (idea.authorId.equals(req.user._id)){
        await Idea.deleteOne({_id: ideaId});
        return res.json({message: `Successfully Deleted Idea _id: ${ideaId}`})
      } 
      return res.json({message: `Idea _id: ${ideaId} can only be deleted by Author ${idea.author}`});
    } 
    return res.json({message: `Idea with _id: ${ideaId} not found`});
  });



// SERVER
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
  });
}

module.exports = app;
