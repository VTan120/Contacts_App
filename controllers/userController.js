const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Get Current User
//@route GET '/users/current'
//@access private
const getCurrentUser = asyncHandler( async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
});

//@desc Login User
//@route GET '/users/login'
//@access public
const logintUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({email});

    if(user && bcrypt.compare(password, user.password)){
        const accessToken = await jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, process.env.ACCESS_TOKEN_SECRET , {expiresIn:"10m"})
        res.status(200).json({token:accessToken});
    }
    else{
        res.status(400);
        throw new Error("Login Failed");
    }
    
});

//@desc Register User
//@route GET '/users/register'
//@access public
const registerUser = asyncHandler( async (req, res) => {
    const { username , email , password } = req.body;

    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const precUser = await User.findOne({email});

    if(precUser){
        res.status(400);
        throw new Error("Email Already Used");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if(!hashedPassword){
        res.status(400);
        throw new Error("Error during registration");
    }

    const newUser = await User.create({
        username, 
        email,
        password: hashedPassword,
    })

    if(!newUser){
        res.status(400);
        console.log("Unable to create new user");
        throw new Error("Coudnt Ctrate New User");
    }

    res.status(200).json({ _id:newUser.id, email:newUser.email, username:newUser.username});
});

//@desc Delete User
//@route DELETE '/users/delete'
//@access public
const deleteUser = asyncHandler( async (req, res) => {
    res.status(200).json({message:"delete user"});
});

module.exports = { getCurrentUser , logintUser , registerUser, deleteUser }