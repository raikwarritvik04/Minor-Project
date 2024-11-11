const mongoose = require('mongoose');

// Get MongoDB URI from environment variables or use the default URI
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/true_care";

async function connectDB() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB!");
    } catch (e) {
        console.error("Connection error:", e);
        process.exit(1); // Exit the process if unable to connect
    }
}

module.exports = { connectDB }; // Exporting connectDB