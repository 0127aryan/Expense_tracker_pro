require ("express-async-errors");

const express = require("express");
const errorHandler = require("./Handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");


require("dotenv").config();


const app = express();

mongoose
.connect(process.env.mongo_connection,{})
.then(() =>{
    console.log("Mongo Connection Successfull");
})
.catch(()=>{
    console.log("Mongo connection failed");
})


app.use(express.json());


//Routes

app.use("/api/users", userRoutes)

//end of all routes

app.use(errorHandler)

//Models initialization

require("./models/users.model");



app.listen(8000,() => {
    console.log("server started successfully")
})