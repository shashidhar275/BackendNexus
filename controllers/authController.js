const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req,res)=>{
    const {user,pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({'message': "Username and password are required"});
    const foundUser = await User.findOne({ username: user }).exec();
    if(!foundUser) return res.sendStatus(401); //Unauthorized
    //Evaluate password
    const match = await bcrypt.compare(pwd,foundUser.password);
    if(match){
        const roles = Object.values(foundUser.roles);
        //create JWT's 
        const accessToken = jwt.sign(
            {                                    //This one is payload ie first one 
                "UserInfo":{   //Here we are using different namespace(UserInfo)
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn:"30s" }
        )
        const refreshToken = jwt.sign(
            { "username": foundUser.username }, //And there is no reason to send roles into the refresh token because ideally access token only be saved in the memory on the frontend..but we don't have control over that....So when we do send the roles, we are just sending codes not actually word admin or editor soo we are just hiding each one of is by using codes but at the same time ideally access token would only be saved in memory ...but there is no need whatso ever to send the roles in the refresh token..........Refresh token is only there to verify that user can get a new access token 
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d"}
        )
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt',refreshToken,{ httpOnly: true, sameSite: 'None',maxAge: 24 * 60 * 60 * 1000});//In options we assign httpOnly option true so that the cookie could not be accessed by Javascript(i.e For Security Purpose)    ....., secure: true must for production and in development mode we should remove it for to get accessToken from refreshTokenController
        res.json({accessToken});
    }else{
        res.sendStatus(401);
    }
}

module.exports = {handleLogin};