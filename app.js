require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/users");


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
    res.send("Home");
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


app.post("/logout", (req, res)=>{
  if (!req.user) return res.json({message: "No User is logged in"});
  const user = req.user;
  req.logout(err=>{
    if (err) next(err);
  });
  res.json({ message: "Logged out Successfully", username: user.fullName })
})


// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serving is running at PORT ${PORT}`);
})
