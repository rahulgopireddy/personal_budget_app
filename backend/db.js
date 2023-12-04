const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/myapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

const disconnectDB = () => {
  mongoose.disconnect(() => {
    console.log("MongoDB Disconnected");
  });
};

module.exports = { connectDB, disconnectDB };
