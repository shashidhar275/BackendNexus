const {logEvents} = require('./logEvents');

const errorHandler = (err,req,res,next)=>{   //Error handling middleware 
    logEvents(`${err.name}: ${err.message}`,'errLog.txt');
    console.error(err.stack);
    // res.status(500).send('okay done bye bye ',err.message);
    //res.send(500,err.message);
    res.status(500).send(err.message);
}

module.exports = errorHandler;