const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    category:{
        type:String,
        unique: true
    }


  
})



mongoose.model('Category',categorySchema);