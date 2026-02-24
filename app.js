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
app.use(bodyParser.urlencoded({extended: true}));
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
app.get("/", (req, res)=>{
    res.send("Home");
});

app.post("/register", async (req, res) => {
  try {
        const user = await User.register({ 
          username: req.body.email,
          fullName: req.body.username,
        }, req.body.password);
          
      req.login(user, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Login after registration failed", error: err });
        }
        // Success 
        res.json({ message: "Registration and login successful" });
      });
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
});



// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Serving is running at PORT ${PORT}`);
})
