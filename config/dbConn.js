const mongoose = require('mongoose');

const connectDB = async()=>{ 
    try{
        await mongoose.connect(process.env.DATABASE_URI,{
            useUnifiedTopology: true,       //Couple of options that will just prevent warnings that we will get from mongodb
            useNewUrlParser: true
        });
    } catch(err){
        console.error(err);
    }
}

module.exports = connectDB ; 