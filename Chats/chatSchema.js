const mongoose= require("mongoose");

const chatSchema=mongoose.Schema({
    from:{
        type:String,
      
        required:true,
       
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    date:{
        type:Date
    },
    message:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('chats',chatSchema)

