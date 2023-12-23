const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define the schema (the structure of the article)
const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    age: Number,
    country: String,
    gender: String,
  },
  { timestamps: true }
);

// creat a model based on that Schema
const User = mongoose.model("customer", userSchema);

// export Schema code and model
module.exports = User;
