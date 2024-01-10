//It's important to note that code works like a waterfall from top to bottom 
const express = require('express');
const app = express(); //We can use other names like server but we don't..since most of them use app as variable
const path = require('path');
const PORT = process.env.PORT || 3500; //Port setup 1st step
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandlers'); //If we are importing a module which has only one component of module.exports.... then during mainfile import we should not use curly brackets it gives typeError (if we use curly brackets then it's value will be undefined)
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
//Custom middleware logger
app.use(logger);

//Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions)); //CORS a very useful third party middleware

// app.get('/',(req,res)=>{
//     res.send('Hello World!');
// });
// app.get('/',(req,res)=>{
//     //res.sendFile('./views/index.html',{root: __dirname})
//     res.sendFile(path.join(__dirname,'views','index.html'));
// })

//Built in middleware to handle urlencoded data
//in other words, form data:
//'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({extended:false})); //Applys to all routes

//Built-in middleware for json 
app.use(express.json());

//Middleware for cookies
app.use(cookieParser());

//Serve static files
app.use('/',express.static(path.join(__dirname,'/public')));

//Routes
app.use('/',require('./routes/root'));
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresh',require('./routes/refresh')); //The refresh endpoint will receive the coookiee that have the refresh token and that will issue the access token ..once the access token has expired 
app.use('/logout',require('./routes/logout'));

app.use(verifyJWT); 
app.use('/employees',require(path.join(__dirname,'routes','api','employee')));

/* 
Knowledge purpose

app.get('/hello(.html)?',(req,res,next)=>{
    console.log('Attempting to enter into the hello.html file');
    next();
},(req,res)=>{             //Routing handlers chaining 
    res.send('hello world');
})



//Chaining route handlers
const one = (req,res,next)=>{
    console.log('one');
    next();
}

const two = (req,res,next)=>{
    console.log('two');
    next();
}

const three = (req,res)=>{
    console.log('three');
    res.send('Finished');
}

app.get('/chain(.html)?',[one,two,three]);

*/

//app.use is likely to be used for middleware but app.all is used for routing this means it will apply to all http methods all at once ()(it also accept regex(OR operator))
app.all('*',(req,res)=>{ // As we are pretty much end of the page anything that reach here should be responded with 404 status code 
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    }else if(req.accepts('json')){
        res.json({error: "404 Not Found"});
    }else{
        res.type('txt').send('404 Not Found');
    }
});
 
app.use(errorHandler);

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));// 3rd step(For where the server should listen for the http requests) It is where the HTTP server starts listening for incoming requests on the specified port