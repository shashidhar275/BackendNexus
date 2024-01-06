const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');

//Below code is the way how we handle route in an API 
router.route('/')  //We use this syntax just to use or handle different http requests for a single route(ie '/') => router.route 
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee)

    //Above we chained each http method together...get,post,put,delete all coming onto a single route

    router.route('/:id')  //A get request that has a parameter inside of the URL 
        .get(employeesController.getEmployee)
    module.exports = router;