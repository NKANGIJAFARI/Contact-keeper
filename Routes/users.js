const express = require('express');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const router = express.Router();
const {check, validationResult } = require('express-validator');

//calling the user model
const User = require('../Models/User');


//@route    POST api/users
//@desc:    Register users 
//@access:  public

const checking = [
    check("name", "Please add a name").not().isEmpty(),
    check("email", "Please enter a valid Email address").isEmail(),
    check("password", "Password be 6 or more characters long").isLength({
        min:6
    })
];

router.post('/', checking, async (req, res)=>{
     //We first check for errors.
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    //This is destructuring from the rquest body.
    const {name, email, password} = req.body;

    try {
        //First we check if the user exists in the database.

        let user = await User.findOne({email}); 
        if(user){
            return res.status(400).json({msg: "Email already exists" })
        }

         user = new User({
            name: name,
            email: email,
            password: password
        })

        //Encrypting of password with bcrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //We save the data to the database
        await user.save();
        
        const payload = {
            user: {id: user.id}
        }

        jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 36000
            }, (err, token)=>{
                if(err) throw err;
                res.send({token})
            }
        );


    } catch (error) {
        console.error(error.message);
        res.status(400).send("Server Error")
    }
});



// //@route    POST api/users
// //@desc:    Register users 
// //@access:  Private
// router.put('/', auth, async(req, res)=>{

//     const {name, email, password} = req.body;

//     try {
//         let alreadyExists = await User.findOne({email});

//         if(alreadyExists){
//             res.status(400).json({msg: "Email already Taken"})
//         }

//         let user = await User.findOne(req.user.email);

//         if(!user){
//             res.status(400).json({msg: "User already exist"})
//         }

        
//         //   //Make sure only owner of contact can update it.
//         // if(user.user.toString() !== req.user.id){
//         //     return res.status(401).json({msg: "Unauthorized to change contact"})
//         // }
//         const userEdits = {};

//         if(name){userEdits.name= name};
//         if(email){userEdits.email= email};
//         if(password){
//             const salt = await bcrypt.genSalt(10);
//             userEdits.password = await bcrypt.hash(password, salt);
//         };
        
//         user = await User.findOneAndUpdate(
//             req.user.email, 
//             {$set : userEdits},
//             {new: true});

//         res.json(user);            

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({msg: "Server Error"})
//     }
// } )


module.exports = router;