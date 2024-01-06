const data = {
    employees: require('../model/employee.json'),
    setEmployee: function (data){
        this.employees = data;
    }
}

const getAllEmployees = (req,res)=>{
    res.json(data.employees);
}

const createNewEmployee = (req,res)=>{
    const newEmployee = {
        "id": data.employees.length===0? 1 :Number(data.employees[data.employees.length-1].id) + 1,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    }

    if(!newEmployee.firstname || !newEmployee.lastname){
        res.status(400).json({"message": "First and last name are required. "})
    }
    data.setEmployee([...data.employees,newEmployee]);
    //data.setEmployee(simpleJson);
    //data.employees = simpleJson;
    res.status(201).json(data.employees); // 201: status recorded
}

const updateEmployee = (req,res)=>{
    const employee = data.employees.find(emp => emp.id === req.body.id);
    if(!employee){
        res.status(400).json({"message" : `Employee ID ${req.body.id} not found`});
    }
    if(req.body.firstname) employee.firstname = req.body.firstname;
    if(req.body.lastname) employee.lastname = req.body.lastname;
    const filteredArray = data.employees.filter(emp => emp.id!==req.body.id);
    const unsortedArray = [...filteredArray,employee];
    data.setEmployee(unsortedArray.sort((a,b)=> a.id>b.id ? 1 : a.id < b.id? -1 : 0));
    res.json(data.employees);
    /*
    if(data.employees.length===0 || req.body.id === 0 || (req.body.id>data.employees.length)){
        res.status(400).json({"message": `Employee ID ${req.body.id} not found`});
    }else{
        data.employees[req.body.id-1].firstname = req.body.firstname;
    }
    res.json(data.employees)
    */
}

const deleteEmployee = (req,res)=>{
    const employee = data.employees.find(emp => emp.id===req.body.id);
    if(!employee){
        res.status(400).json({"message" : `Employee ID ${req.body.id} not found`});
    }
    const filteredArray = data.employees.filter(emp => emp.id!==req.body.id);
    data.setEmployee([...filteredArray])
    res.json(data.employees);
}

const getEmployee = (req,res)=>{
    // console.log('hi');
    // console.log(typeof req.params.id)
    const employee = data.employees.find(emp => emp.id ==req.params.id);
    if(!employee){
        res.status(400).json({"message":`Employee ID ${req.params.id} not found`});
    }
    res.json(employee);
    // res.json({"id": req.params.id})  //Here we are using req.params (above we used req.body) because here we are not receiving any parameter from the user unlike above cases we got with post,put => firstname,lastname
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}