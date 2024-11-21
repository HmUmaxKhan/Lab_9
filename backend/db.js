const mongoose = require("mongoose");

const connectDB = () => {
  const mongoURI = "mongodb://127.0.0.1:27017/week4&5?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1";

  if (!mongoURI) {
    console.error("MongoDB connection URI is not provided.");
    
  }

  mongoose.connect(mongoURI)
    .then(() => {
      console.log("Db is connected");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

module.exports = connectDB;
