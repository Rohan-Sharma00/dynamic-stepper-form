const mongoose = require("mongoose");

const connectDB = async () => {
   console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
  await mongoose.connect(
    process.env.MONGODB_URI
  );

  console.log("Database connected");
};

module.exports = {
  connectDB,
};