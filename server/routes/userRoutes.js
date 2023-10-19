const express = require("express");
const router = express.Router();

const userController= require("../controllers/userController");

// registration 
router.post("/register", userController.registerUser);

//login
router.post("/login", userController.loginUser);

module.exports = router;
