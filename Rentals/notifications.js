const mongoose = require("mongoose");

const schema = mongoose.Schema({
    bookid: {
        type: mongoose.Schema.Types.ObjectId,

        required: true,
        ref: 'books'

    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    
    duedate:{
        type:Date
    },
    fine: {
        type: Number
        }
});
module.exports = mongoose.model('notifications', schema)

