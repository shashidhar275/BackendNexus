const verifyRoles = (...allowedRoles)=>{  //It's going to accept lot of parameters if we wanted to however many roles we wanted to pass in and the way we do that is with rest operator ..it looks just like the spread operator but it lets us pass in as many paramters as we wish 
    return (req,res,next)=>{
        if(!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val===true);
        if(!result) return res.sendStatus(401);
        next();
    }
}  


module.exports = verifyRoles;