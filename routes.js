const router=require('express').Router()
const deliverys=require('./TestSchema')
router.post('/add',(req,res)=>{


    const newdelivery=new deliverys({
        firstname:req.body.firstname,

        housename:req.body.housename,
       
    })
    newdelivery.save().then(data=>{
        res.json({
            status:200,
            msg:"Inserted successfully",
            data:data
        })
    }).catch(err=>{
        res.json({
            status:500,
            msg:"Data not Inserted",
            Error:err
        })
    })
})

module.exports=router