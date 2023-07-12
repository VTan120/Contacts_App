const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Need A User Id"],
            ref: "User"
        },
        name:{
            type:String,
            required: [true, "Please Provide Contact Name"]
        },
        email:{
            type:String,
            required: [true, "Please Provide Contact Email Address"]
        },
        phone:{
            type:String,
            required: [true, "Please Provide Contact Phone Number"]
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Contact",contactSchema);