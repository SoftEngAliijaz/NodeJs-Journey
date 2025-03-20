const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

async function connectDatabase(url) {
  try {
    await mongoose.connect(url);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

module.exports = { connectDatabase };
