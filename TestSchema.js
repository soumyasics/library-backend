const mongoose= require("mongoose");

const deliverySchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    housename:{
        type:String,
        required:true
    }
    

});
module.exports=mongoose.model('deliveryagents',deliverySchema)

