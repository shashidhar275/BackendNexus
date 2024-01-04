const express = require('express');
const app = express(); //We can use other names like server but we don't..since most of them use app as variable
const path = require('path');
const PORT = process.env.PORT || 3500; //Port setup 1st step

// app.get('/',(req,res)=>{
//     res.send('Hello World!');
// });
// app.get('/',(req,res)=>{
//     //res.sendFile('./views/index.html',{root: __dirname})
//     res.sendFile(path.join(__dirname,'views','index.html'));
// })
app.get('^/$|/index(.html)?',(req,res)=>{      //Regex operator => |
    res.sendFile(path.join(__dirname,'views','index.html'));
})

app.get('/new-page(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','new-page.html'));
})

app.get('/old-page(.html)?',(req,res)=>{
    res.redirect(301,'new-page.html');
})

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

app.get('/*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})



app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));// 3rd step(For where the server should listen for the http requests) It is where the HTTP server starts listening for incoming requests on the specified port