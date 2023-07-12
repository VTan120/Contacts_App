const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please Enter Username"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email already used"],
        },
        password: {
            type: String, 
            required: [true, "Password is mandatory"],
        }
    },
    {
        timestamp:true
    }
);

module.exports = mongoose.model("User", userSchema);