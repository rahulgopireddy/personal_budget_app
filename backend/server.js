// server.js
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoute");
const expensesRouter = require("./routes/expensesRoutes");
const cors = require("cors");
const db = require("./db");
const app = express();
const PORT = 3000;
app.use(cors());
// Middleware for parsing JSON data
app.use(bodyParser.json());
// Connect to the database
db.connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/expense", expensesRouter);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Handle disconnection on process termination
process.on("SIGINT", () => {
  db.disconnectDB();
  process.exit(0);
});
