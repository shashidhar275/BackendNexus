const express = require('express');
const path = require('path');
const router = express.Router();
const data = {};
data.employees = require("../../data/employee.json");

//Below code is the way how we handle route in an API 
router.route('/')  //We use this syntax just to use or handle different http requests for a single route(ie '/') => router.route 
    .get((req,res)=>{
        res.json(data.employees);
    })
    .post((req,res)=>{
        res.json({  //We are not setting up the api here but we are just focussing on the api showcase (we get those paramters for http post request => req.body.firstnamem & req.body.lastname)
        "firstname": req.body.firstname,
        "lastname":  req.body.lastname
        });
    })
    .put((req,res)=>{ // This is the http method that we use when we are updating the employee
        res.json({
            "firstname": req.body.firstname,   //We are not updating or actually coding the api here 
            "lastname": req.body.lastname
        })
    })
    .delete((req,res)=>{
        res.json({"id": req.body.id})
    })

    //Above we chained each http method together...get,post,put,delete all coming onto a single route

    router.route('/:id')  //A get request that has a parameter inside of the URL 
        .get((req,res)=>{
            res.json({"id": req.params.id})  //Here we are using req.params (above we used req.body) because here we are not receiving any parameter from the user unlike above cases we got with post,put => firstname,lastname
        })
    module.exports = router;