const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
const mongoose = require("mongoose")


//@desc Get all contacts
//@route GET '/contacts/'
//@access private
const getContacts = asyncHandler( async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc Get specific contact
//@route GET '/contacts/:id'
//@access private
const getContact = asyncHandler( async (req, res) => {
    //Checking is passed id is valid
    if( !mongoose.Types.ObjectId.isValid(req.params.id) ) {
        console.log("Id is not valid");
        res.status(404);
        throw new Error("Contact Not Found");
    }

    //Get required contact
    const contact =await Contact.findById(req.params.id);

    //Error handler if contact doesnt exist
    if (!contact){
        console.log("Id valid but contact not found");
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User Is Not Authorized");
    }s

    //Return the fetched contact
    res.status(200).json(contact);
});

//@desc Post contacts
//@route POST '/contacts/'
//@access private
const postContact = asyncHandler( async (req, res) => {
    const {name , email, phone} = req.body
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const newContact = await Contact.create(
        {name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(200).json(newContact);
});

//@desc Update contacts
//@route PUT'/contacts/:id'
//@access private
const updateContact = asyncHandler( async (req, res) => {

    //Checking is passed id is valid
    if( !mongoose.Types.ObjectId.isValid(req.params.id) ) {
        console.log("Id is not valid");
        res.status(404);
        throw new Error("Contact Not Found");
    };

    //Get required contact
    const contact =await Contact.findById(req.params.id);

    //Error handler if contact doesnt exist
    if (!contact){
        console.log("Id valid but contact not found");
        res.status(404);
        throw new Error("Contact Not Found");
    };

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User Is Not Authorized");
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updateContact);
});

//@desc Delete contacts
//@route DELETE '/contacts/:id'
//@access private
const deleteContact = asyncHandler( async (req, res) => {
    if( !mongoose.Types.ObjectId.isValid(req.params.id) ) {
        console.log("Id is not valid");
        res.status(404);
        throw new Error("Contact Not Found");
    };

    //Get required contact
    const contact =await Contact.findById(req.params.id);

    //Error handler if contact doesnt exist
    if (!contact){
        console.log("Id valid but contact not found");
        res.status(404);
        throw new Error("Contact Not Found");
    };

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User Is Not Authorized");
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.status(200).json(contact);
});

module.exports = { getContact , getContacts , postContact , updateContact , deleteContact }