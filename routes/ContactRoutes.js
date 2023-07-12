const express = require("express");
const { getContacts , getContact , postContact , updateContact , deleteContact } = require("../controllers/contactController.js");
const validateToken = require("../middlewares/validateTokenHandler.js");
const router = express.Router();

router.use(validateToken);
router.route("/").get(getContacts).post(postContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);



module.exports = router;