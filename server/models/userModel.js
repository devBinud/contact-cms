const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add name properly"],
  },
  email: {
    type: String,
    required: [true, "Please add user email address"],
    unique: [true, "Email address already taken "],
  },
  phone: {
    type: String,
    required: [true, "Please add user phone no"],
    unique: [true, "Phone no already used "],
  },
  password: {
    type: String,
    required: [true, "Please add the user password"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports= User;