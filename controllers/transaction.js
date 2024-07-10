const Transaction = require('../models/transaction')

const getAll = async(req,res) => {
    try {
        const {Frequency,selectDate,type} = req.body;
        const trans = await Transaction.find({
            ...(Frequency !== 'custom' ?{
                date:{
                    $gt: moment.subtract(Number(Frequency),"d").toDate(),
                }
            }:{
                date:{
                    $gte:selectDate[0],
                    $lte:selectDate[1]
                }
            }),
            userId: req.body.userid,
            ...(type !== 'all' && {type}),
        });
        res.status(200).json(trans);
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong",error);
    }
}

const addTransaction = async(req,res)=>{
    try{
        const newTrans = new Transaction(req.body);
        await newTrans.save();
        res.status(201).send("Transaction added successfully");
    }catch(err){
        console.log(err);
        res.status(500).json("Something went wrong",err);
    }
};

module.exports = {getAll, addTransaction};