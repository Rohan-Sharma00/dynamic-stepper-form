const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

module.exports = { connectDB };