const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb://localhost:27017/task-manager-app"
    );

    console.log(`Database Connected`);
  } catch (error) {}
};

module.exports = connectDB;
