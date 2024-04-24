const mongoose= require("mongoose");

const bookSchema=mongoose.Schema({
    bookname:{
        type:String,
      
        required:true,
       
    },
    pubdate:{
        type:Date,
        required:true,
           },
    synopsis:{
        type:String,
        required:true,
       
    },
    authorname:{
        type:String,
        required:true
    },
    image:{
        type:Object
    },
    quantity:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String

    }

});
module.exports=mongoose.model('books',bookSchema)

