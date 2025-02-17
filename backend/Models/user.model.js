const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({

    fullName: {
        type : String,
        require : true
    },
    email: {
        type : String,
        require : true,
        unique : true,
        validate : [validator.isEmail , 'field must be a valid email']
    },
    password: {
        type : String,
        require : true
    },
    createdAt: {
        type : Date,
        default: new Date().getTime()
    },  
})

module.exports = mongoose.model('User',userSchema);