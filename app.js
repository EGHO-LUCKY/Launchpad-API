require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));



const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Serving is running at PORT ${PORT}`);
})
