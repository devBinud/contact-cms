const express = require("express");
const app = express();
var bodyParser = require("body-parser");
require("dotenv").config()
const connectDB = require("./db/connection");


connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));


// Listening to port
 const port = process.env.DEV_PORT || 8000;

 app.listen(port,()=>{
    console.log(`Listening to port no ${port}`)
 })
