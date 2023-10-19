const mongoose = require("mongoose");


const DB = () => {
  mongoose.connect(`${process.env.MONGO_URI}/${process.env.local_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
};

module.exports= DB;
