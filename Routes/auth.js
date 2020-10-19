const express = require('express');

const router = express.Router();

//@route    GET api/users
//@desc:    Get loggedin users
//@access:  private

router.get('/', (req, res)=>{
    res.send('Get logged in user');
});


//@route    POST api/users
//@desc:    Auth user and get the token
//@access:  public

router.post('/', (req, res)=>{
    res.send('Login users');
});

module.exports = router;