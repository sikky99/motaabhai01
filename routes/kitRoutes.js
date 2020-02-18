const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const bodyParser = require('body-parser');
const requireToken = require('../middleware/requireToken');
const Kit = mongoose.model('Kit')
const router = express.Router();
router.use(requireToken);

router.get('/kits', async(req, res) => {
    // console.log('get')
    
    const kits = await Kit.find({userId: req.user._id})
    res.send(kits[0])

    console.log(kits)
})


// router.post("/api/upload", upload.array("photo",3 ),async (req, res)=>{
//     // console.log(req.body)
//     // console.log("file", req.files[0].path);
//     // console.log("body", req.body.productName);
//     const {productName} = await req.body;
//     const {price} = await req.body;
//     const {category} = await req.body;
//     const {description}= await req.body;
//     const {code}= await req.body;
//     const {cost}= await req.body;
//     const {unit}= await req.body;
//     const {variantOption}= await req.body;
//     const {variantName}= await req.body;
    
//     const imageData = "https://stupid-bobcat-10.localtunnel.me/" + await req.files[0].path
//     if(!productName){
//         return  res.status(422).send({error: 'you must provide a name'})
//     }
//     try {
//         const product =  new  Kit({productName,price,imageData, userId:req.user._id, category,
//             description,code,cost,unit,variantOption,variantName
//         });
//     await product.save();
//     res.send(product)
//     } catch(err){
//         res.status(422).send({err:err.message})
//     }
// })


router.post('/kits',async(req, res) => {

     console.log('chawal')

    // console.log(typeof req.body.productname)
    console.log(req.body)
    

  
    const productname = await req.body.productname;
    // const {price} = await req.body
    // const {imageData} = await req.body
    // if(!productName){
    //     return  res.status(422).send({error: 'you must provide a name'})
    // }
    try {
        const kit =  new  Kit({productname,userId:req.user._id});
    await kit.save();
    res.send(kit)
    console.log('done')
    } catch(err){
        res.status(422).send({err:err.message})
    }
    
    
})



// router.post('/kits', async(req, res) => {
//     // console.log('working')
//     console.log(req.body)
//     // console.log('chawal')
//     // const {name} = req.body
//     // if(!name){
//     //     return  res.status(422).send({error: 'you must provide a name'})
//     // }

//     // try {
//     //     const product = new Product({name, userId:req.user._id});
//     // await product.save();
//     // res.send(product)
//     // } catch(err){
//     //     res.status(422).send({err:err.message})
//     // }
    
    
// })



module.exports = router