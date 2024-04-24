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
    review:{
        type:String
    }
});
module.exports = mongoose.model('reviews', schema)

