const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401); //Unauthorized 
    console.log(authHeader); //Bearer token 
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded)=>{   //Decoded payload
            if(err) return res.sendStatus(403); //Forbidden Because at this point we know we have received the token but something about it wasn't right in other words it may have tempered (so it is invalid token) 
            req.user = decoded.username;
            next();
        }
    );
}

module.exports = verifyJWT ; 