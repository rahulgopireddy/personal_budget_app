const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const authMiddleware = require("../middleware/authMiddleware");
const { authenticateUser } = require("../middleware/authMiddleware");
const User = require("../models/User");
const app = express();
app.use(express.json());
const users = [
  { id: 1, username: "user123@gmail.com", password: "password123" },
  // Add more users as needed
];
// POST login route

router.post("/login", authenticateUser, (req, res) => {
  // User is authenticated, generate a token and send it back to the client
  const token = jwt.sign(
    { user: { id: req.user._id, email: req.user.email } },
    "yoursecretkey",
    { expiresIn: "55min" }
  );

  res.json({ token });
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      // Duplicate key error (email already exists)
      res.status(400).json({ message: "Email is already in use" });
    } else {
      // Other errors
      res.status(500).json({ message: "Internal server error" });
    }
  }
});
// GET login page route
router.get("/protected", authMiddleware.authenticate, (req, res) => {
  res.send("Protected route");
});

module.exports = router;
