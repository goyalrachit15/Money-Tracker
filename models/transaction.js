const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    type:{
        type:String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    reference:{
        type:String
    },
    description:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;