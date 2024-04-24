const mongoose= require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
      
        required:true,
       
    },
    phone:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    email:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:Object
    },
    imgUrl:{
        type:String

    }
});
module.exports=mongoose.model('users',userSchema)

