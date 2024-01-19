const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Employee',employeeSchema); //By default mongoose when it creates this model will set it to lowercase and plural..so it look for employees collection in MongoDB and employees collection will be all lowercase and once again it will be plural    