const express = require('express');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth')

const router = express.Router();
const {check, validationResult } = require('express-validator');

const User = require('../Models/User');
const { json } = require('express');

//@route    GET api/users
//@desc:    Get loggedin users
//@access:  private

router.get('/', auth, async(req, res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error')
    }
});




//@route    POST api/users
//@desc:    Auth user and get the token
//@access:  public


const checking = [
    check("email", "Invalid Credentials"),
    check("password", "Invalid credentials")
];

router.post('/', checking, async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email}); 
        if(!user){
            return res.status(400).json({msg: "User doesnt exists" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            return res.status(400).json({
                msg: "Password doesnt match the h"
            })
        }

        const payload = {
            user: { id: user.id }
        }

        jwt.sign(payload, config.get('jwtSecret'), (err, token)=>{
            if(err) throw err;
            res.json({ token })
        })


    } catch (err) {
        console.error(err)
        res.status(500).send("Server error")
    }
});

module.exports = router;