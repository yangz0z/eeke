const mongoose = require("mongoose");

exports.mongoDB = () => {
  mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("mongodb connected"))
  .catch(() => console.log("mongodb connection failed"));  
}