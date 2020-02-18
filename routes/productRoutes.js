const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const bodyParser = require('body-parser');
const requireToken = require('../middleware/requireToken');
const Product = mongoose.model('Product')
const router = express.Router();
router.use(requireToken);

const Storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './images');
    },
    filename(req, file, callback){
        callback(null, `${file.filename}_${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({ storage: Storage });

router.get('/products', async(req, res) => {
    // console.log('get')
    
    const products = await Product.find({userId: req.user._id})
    res.send(products)
    // console.log(products)
})


router.get('/categories', async(req, res) => {
    // console.log('get')
    
    const categories = await Product.find({userId: req.user._id,}).sort()
    res.send(categories)
    // console.log(categories)
})


router.post("/api/upload", upload.array("photo",3 ),async (req, res)=>{
    // console.log(req.body)
    // console.log("file", req.files[0].path);
    // console.log("body", req.body.productName);
    const {productName} = await req.body;
    const {price} = await req.body;
    const {category} = await req.body;
    const {description}= await req.body;
    const {code}= await req.body;
    const {cost}= await req.body;
    const {unit}= await req.body;
    const {variantOption}= await req.body;
    const {variantName}= await req.body;
    
    const imageData = "http://516d9d6f.ngrok.io/" + await req.files[0].path
    if(!productName){
        return  res.status(422).send({error: 'you must provide a name'})
    }
    try {
        const product =  new  Product({productName,price,imageData, userId:req.user._id, category,
            description,code,cost,unit,variantOption,variantName
        });
    await product.save();
    res.send(product)
    } catch(err){
        res.status(422).send({err:err.message})
    }
})


router.post('/products',upload.array("photo",3 ), async(req, res) => {
    console.log(req.body)
    const {productName} = await req.body;
    const {price} = await req.body
    const {imageData} = await req.body
    if(!productName){
        return  res.status(422).send({error: 'you must provide a name'})
    }
    try {
        const product =  new  Product({productName,price,imageData, userId:req.user._id});
    await product.save();
    res.send(product)
    } catch(err){
        res.status(422).send({err:err.message})
    }
    
    
})

// router.post('/kits', async(req, res)=>{
//     // const {productName} = await req.body;
//     const {productname} = await req.body
//     console.log(productname)

//     const kits = new Kits
//     // if(!productName){
//     //     return  res.status(422).send({error: 'you must provide a name'})
//     // }
  
  
//     // try {
//     //     const kits =  new  Product({productname, userId:req.user._id});
//     // await kits.save();
//     // res.send(kits)
//     // console.log('done')
//     // } catch(err){
//     //     res.status(422).send({err:err.message})
//     // }
   
 
// })



// router.post('/products', async(req, res) => {
//     console.log(req.body)
//     const {name} = req.body
//     if(!name){
//         return  res.status(422).send({error: 'you must provide a name'})
//     }

//     try {
//         const product = new Product({name, userId:req.user._id});
//     await product.save();
//     res.send(product)
//     } catch(err){
//         res.status(422).send({err:err.message})
//     }
    
    
// })



module.exports = router