const express = require('express');

const router = express.Router();

//@route    GET api/contacts
//@desc:    Get user contacts
//@access:  Private

router.get('/', (req, res)=>{
    res.send('Register user');
});



//@route    POST api/contacts
//@desc:    Add contacts to db
//@access:  Private

router.post('/', (req, res)=>{
    res.send(' Add contacts to user');
});


//@route    PUT api/contacts/:id
//@desc:    Update contact
//@access:  Private

router.put('/:id', (req, res)=>{
    res.send('Contact update');
});

//@route    DELETE api/contacts/:id
//@desc:    Delete contact
//@access:  Private

router.delete('/:id', (req, res)=>{
    res.send('Delete update');
});


module.exports = router;