const asyncHandler  = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler( async (req, res, next) => {
    console.log("Started Validation");
    var token;
    let  authHead = req.headers.Authorization || req.headers.authorization;

    console.log("Got Auth Head", authHead);
    
    if(authHead && authHead.startsWith("Bearer")){
        token = authHead.split(" ")[1];
        await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                console.log(err);
                res.status(400);
                throw new Error("Authentication Failed");
            }
            console.log(decoded);
            req.user = decoded.user;
            next();
        });
    }
    if(!token){
        res.status(401);
        throw new Error("User Not Authorized or Token Missing");
    }
});

module.exports = validateToken;