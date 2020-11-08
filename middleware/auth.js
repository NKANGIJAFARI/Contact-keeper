const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) =>{
    //Get token from the header

    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({ 
            msg: "No toke, authorix=zation denied"
        })
    }

    try {
        const decoded =  jwt.verify(token, config.get('jwtSecret'))
        //  Once the token is verified, the payload consisting of user
        //  deatils will be put in the decoded

        req.user = decoded.user;

        next()

    } catch (error) {
        console.error(error.message)
        res.status(401).json({msg: "Token is invalid"})
        
    }
}

module.exports = auth