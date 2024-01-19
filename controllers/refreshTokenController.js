//We have this controller because we are going to have refreshToken route
const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req,res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401); //Unauthorized //Optional chaining 
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec(); // We have to put .exec() since we are using async and await 
    //Evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403); //If possible need to check this again for username (it's personal) //REMEMBER :You cannot access or change signature of the token //At this point if foundUserName and decodedUserName do not match means client tampered his payload username..
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                { 
                    "UserInfo":{
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s'}
                );
                res.json({accessToken});
        }
    )
}

module.exports = {handleRefreshToken};