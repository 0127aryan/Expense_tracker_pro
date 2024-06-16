const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middleware/auth");


const userRoutes = express.Router();

//Routes....

userRoutes.post("/register", register);
userRoutes.post("/login", login);

userRoutes.use(auth);

//Protected routes...
userRoutes.get("/dashboard", userDashboard);



module.exports = userRoutes;