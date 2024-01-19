const User = require('../model/User');
const bcrypt = require('bcrypt'); //To hash the passwords also safe and securely store the passwords 

const handleNewUser = async (req,res)=>{
    const {user , pwd } = req.body;
    if(!user || !pwd) return res.status(400).json({"message": "Username and password are required"});
    //Check for duplicate  usernames in the db
    const duplicate = await User.findOne({ username: user}).exec();
    if(duplicate) return res.sendStatus(409);  //Conflict
    try{ 
        //Encrypt the password
        const hashedPwd = await bcrypt.hash(pwd,10);
       
        //Create and Store the new user(Shortest way)
        const result = await User.create({
            "username": user,
            "password": hashedPwd     //ObjectId will be automatically created... so we are not using ID
        });
        
        //All of as one we can do as above or also as individual elements we can do as mentioned below
        /*
        const newUser = new User(); //New document creation
        newUser.username = ...
        const result= await newUser.save();
        */

        //Or also we can do in this way 
        /*
        const newUser = new User({
            "username": user,
            "password": hashedPwd
        });
        const result = await newUser.save();
        */

        console.log(result);
        res.status(201).json({'success': `New user ${user} created!`});
    }catch(err){
        res.status(500).json({'message': err.message});
    }
}

module.exports = {handleNewUser};