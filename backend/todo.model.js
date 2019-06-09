const mongoose = require('mongoose');
const schema = mongoose.Schema;

let todo = new schema({
    todo_description:{
        type:String
    },
    todo_responsibility:{
        type:String
    },
    todo_priority:{
        type:String
    },
    todo_completed:{
        type:Boolean
    }
});

module.exports = mongoose.model('Todo',todo);