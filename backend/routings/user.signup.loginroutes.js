// const { Router } = require('express')
const express = require('express')
const loginSignupController = require('../controller/login.signupController')
const router = express.Router()


// router.route('/signup').get(loginSignupController.page);
router.route('/signup').post(loginSignupController.user_sign_up);
router.route('/verify').get(loginSignupController.verify_otp)
router.route('/login').post(loginSignupController.user_login);
router.route('/shows').post(loginSignupController.shows);






module.exports =router