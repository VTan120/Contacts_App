const express = require("express");
const errorHandler = require("./middlewares/errorHandler.js");
const connectDb = require("./config/dbConnection.js");
const dotenv = require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

connectDb();

app.use(express.json());
app.use("/contacts", require("./routes/ContactRoutes.js"));
app.use("/users", require("./routes/UserRoutes.js"));
app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`Listining to port ${port}`);
})