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
    date: {
        type: Date
    },
    status: {
        type: String,
        default: "assigned"
    },
    duedate: {
        type: Date

    },
    fine: {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('rentals', schema)

