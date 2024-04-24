const mongoose= require("mongoose");

const adminSchema=mongoose.Schema({
    name:{
        type:String,
      
        required:true,
       
    },
    phone:{
        type:String,
        required:true,
       
    },
    email:{
        type:String,
        required:true,
        default:'admin@gmail.com'
       
    },
    password:{
        type:String,
        required:true,
        default:'admin@123'
    },
    image:{
        type:Object
    },role:{
        type:String,
        default:'admin'
    },imgUrl:{
        type:String

    }
});
module.exports=mongoose.model('admin',adminSchema)

