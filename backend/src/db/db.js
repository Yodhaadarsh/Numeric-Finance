const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongodb database connected succesfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
