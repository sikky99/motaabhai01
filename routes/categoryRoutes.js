const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const bodyParser = require('body-parser');
const requireToken = require('../middleware/requireToken');
const Category = mongoose.model('Category')
const router = express.Router();
router.use(requireToken);


router.post('/category', async(req, res)=> {
    console.log(req.body)
    const category = await req.body.category
    
    try {
        const categories =  new Category({category,userId:req.user._id});
        console.log(categories)
        await categories.save();
        res.send(categories)
    console.log('done')
    } catch(err){
        res.status(422).send({err:err.message})
    }
})



router.get('/category', async(req, res)=> {
    // console.log(req.body)
    const category = await Category.find({userId: req.user._id})
    res.send(category)
    console.log(category)
})







module.exports = router