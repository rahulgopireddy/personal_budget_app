const mongoose = require("mongoose");

const dbconnectionString =
  "mongodb+srv://dbUserRahul:Fall%402023@atlascluster.7aitlpf.mongodb.net/budgetAppDb";
//dbUserRahul
//Fall@2023
const connectDB = async () => {
  try {
    await mongoose.connect(`${dbconnectionString}`, {
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
    console.log("Yes,MongoDB Disconnected");
  });
};

module.exports = { connectDB, disconnectDB };
