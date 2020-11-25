const mongoose = require("mongoose");
const config = require("config");
// const db = process.env.mongoURI;
let db;

if (process.env.NODE_ENV !== "production") {
  db = config.get("mongoURI");
} else {
  db = process.env.MONGO_URI;
}

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
