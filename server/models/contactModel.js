const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true,"Please add Name"]
  },
  email: {
    type: String,
    required: [true,"Please add Email"],
    unique: true,

  },
  phone: {
    type: Number,
    required: [true,"Please add Phone Number"],
    unique: true,
  }
})
const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
