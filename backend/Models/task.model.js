const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    title: {
        type : String,
        require : true
    },
    details : {
        type : String,
        require : true,
    },
    isComplete: {
        type : Boolean,
        default : false,
    },
    userId: {
        type : String,
        require : true,
    },
    createAt: {
        type : Date,
        default: new Date().getTime()
    },
});

module.exports = mongoose.model('Task',taskSchema);