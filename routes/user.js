const express = require('express')
const userRoute = express.Router();
const {loginUser,signupUser} = require('../controllers/userController')
userRoute.route('/login').post(loginUser);
userRoute.route('/signup').post(signupUser);
module.exports = userRoute