const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth')
const {check, validationResult } = require('express-validator');

//calling the user model
const User = require('../Models/User');
const Contact = require('../Models/Contact');
const { response } = require('express');



//@route    GET api/contacts
//@desc:    Get user contacts
//@access:  Private
router.get('/', auth,  async(req, res)=>{
    try {
        const contacts = await Contact
                        .find({user: req.user.id})
                        .sort({date: -1});

        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg: 'Server Error'});
    }
});



//@route    POST api/contacts
//@desc:    Add contacts to db
//@access:  Private

const checking = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail()
];

router.post('/', [auth, checking], async(req, res)=>{
        //We first check for errors.
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, email, phone, type, user} = req.body;
    
    try {
        const newContact = new Contact ({
            name,
            email,
            phone, 
            type,
            user: req.user.id
        })

        const contact = await newContact.save();
        res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


//@route    PUT api/contacts/:id
//@desc:    Update contact
//@access:  Private


router.put('/:id',auth, async(req, res)=>{

    const {name, email, phone, type} = req.body;

    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact){
            return res.status(404).json({msg: "Contact not found"})
        }

        //Make sure only owner of contact can update it.
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: "Unauthorized to change contact"})
        }

        contact = await Contact.findByIdAndUpdate(
            req.params.id, 
            {$set : contactFields},
            {new: true});

        res.send(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//@route    DELETE api/contacts/:id
//@desc:    Delete contact
//@access:  Private

router.delete('/:id', async(req, res)=>{
    
    try {
        const contact = await Contact.findById(req.params.id);
        if(!contact){
            res.status(400).json({msg: "Contact not found"})
        }

        await Contact.findByIdAndRemove(contact)

        res.send("Contact Deleted")
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: "Server Error"
        })
    }
});


module.exports = router;