const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    productName:{
        type:String,               
    },
    price:{
        type:String,   
        // required:true            
    },
    product:{
        type:String
    },
    imageName:{
        type:String,
        default:"none",
        // required:true
    },
    imageData:{
        type:String,
        // required:true
    },
    category:{
        type:String,
    },
    description:{
        type:String,
    },
    code:{
        type:String,
    },
    cost:{
        type:String,
    },
    unit:{
        type:String,
    },
    variantOption:{
        type:String,
    },
    variantName:{
        type:String,
    },
    name:{
        type:String,
    },


   
})



mongoose.model('Product',productSchema);