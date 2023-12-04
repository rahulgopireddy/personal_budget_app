const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
function authenticate(req, res, next) {
  // Implement your authentication logic here
  // For example, check if the user is logged in or if the request contains a valid token
  // If authenticated, call next() to proceed to the next middleware/route handler
  // If not authenticated, send an error response
  // Get the token from the request headers, query parameters, or cookies
  const token = req.header("Authorization");
  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "yoursecretkey"); // Replace 'your-secret-key' with your actual secret key
    // Attach the decoded user information to the request object for further use in route handlers
    req.user = decoded.user;

    // Call next() to proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.log(error);
    // If the token is invalid or expired, send an error response
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}
async function authenticateUser(req, res, next) {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // User not found
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      // Invalid password
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Attach user information to request for future use
    req.user = user;
    // console.log(typeof user, user);
    next();
  } catch (error) {
    // Handle any errors that occur during authentication
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  authenticate,
  authenticateUser,
};
