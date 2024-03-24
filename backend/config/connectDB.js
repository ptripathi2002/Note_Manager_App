const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://Prashant_1202:Prashant123_45@prashanttripathicluster.dqhx0g6.mongodb.net/Note_Manager_App?retryWrites=true&w=majority"
    );

    console.log(`Database Connected`);
  } catch (error) {}
};

module.exports = connectDB;
