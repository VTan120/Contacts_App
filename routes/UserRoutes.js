const express = require("express");
const { getCurrentUser , logintUser , registerUser , deleteUser} = require("../controllers/userController");
const validateToken = require("../middlewares/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", logintUser);

router.get("/current", validateToken, getCurrentUser);

router.delete("/delete", deleteUser);


module.exports = router;