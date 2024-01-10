const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/',authController.handleLogin);  //Post http method because we are providing body part for login(ie information about the username and password for login)

module.exports = router;