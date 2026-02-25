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
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(process.env.MONGO_URI, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await mongoose.disconnect();
    }
}
run().catch(console.dir);


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


app.post("/logout", (req, res) => {
  if (!req.user) return res.json({message: "No User is logged in"});
  const user = req.user;
  req.logout(err=>{
    if (err) next(err);
  });
  res.json({ message: "Logged out Successfully", username: user.fullName })
});

app.route("/:user/idea")
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
        title,
        category,
        category,
        shortDescription,
        fullDescription
      })

      return res.json({message: "Idea Created Successfully", idea})
    } catch(err){
      console.log(err);
      return res.json({message: "Error Creating Idea"});
    }
  });



// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serving is running at PORT ${PORT}`);
});
