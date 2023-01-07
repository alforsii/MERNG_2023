const mongoose = require("mongoose");

const mongoDB = async () => {
  mongoose.set("strictQuery", false);
  const db = await mongoose.connect(process.env.MONGO_URI);
  console.log(`Database connected: ${db.connection.name}`);
};

module.exports = mongoDB;
