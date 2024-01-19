//One extra major for security we can add is to offer logout route and with a logout route we can actually then delete refresh token and not let it last for the full duration and that just gives our users the opportunity to logout and ofcourse delete any existing token and ofcourse accesstoken should also been erased off in the frontend when the logout button is cliked as well.... as we are working on the backend so we won't be doing that today
const User = require('../model/User');
const handleLogout = async (req,res)=>{
    //On client, also delete the access token => we can't do it on the backend but frontend client should do that in the memory of the client application.. set it to blank whenever logout button is clicked 
    const cookies = req.cookies;
    // official can  use this but //if(!cookies?.jwt) return res.sendStatus(204); //No content ...since we logging off if there is no presence of cookies or jwt also as we are just logging off so we are responsing with req success and but there is no content to send back 
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    //Is refreshToken in db?
    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser){
        res.clearCookie('jwt',{httpOnly: true, sameSite: 'None', secure: true});
        return res.sendStatus(204); //Suceessful but there is no content to send back 
    }
    //Delete refreshtoken in db
    
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
    
    res.clearCookie('jwt',{httpOnly: true, sameSite:'None',secure: true}); //secure: true only serves on https (in developement http...in production https)
    res.sendStatus(204);
}

module.exports = {handleLogout};