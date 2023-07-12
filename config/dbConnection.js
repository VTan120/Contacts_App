const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Database Connected: ", connect.connection.name, connect.connection.host);
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

module.exports = connectDb;