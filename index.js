require('./models/User');
require('./models/Product')
require('./models/Kit')
require('./models/Category')
const express  = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3000
const {mogoUrl} = require('./keys')


const authRoutes = require('./routes/authRoutes')
const kitsRoute = require('./routes/kitRoutes') 
const productsRoute = require('./routes/productRoutes')
const requireToken = require('./middleware/requireToken')
const categorysRoute = require('./routes/categoryRoutes')

app.use(bodyParser.json())
app.use('/images', express.static('images'))

app.use(authRoutes,)
app.use(productsRoute, express.static('images'))
app.use(kitsRoute, express.static('images'))
app.use(categorysRoute)

mongoose.connect(mogoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
})



mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahh")
})

mongoose.connection.on('error',(err)=>{
    console.log("this is error",err)
})

app.get('/',requireToken,(req,res)=>{
    res.send({email:req.user.email})
    
    console.log(({email:req.user}))
    
})

    



// 

// app.get('/test',requireToken,(req,res)=>{
//     res.send({name: req.user.name})    
//     // console.log(({name:req.user}))
    
// })

// app.post('/profile',requireToken,(req,res)=>{
//     console.log(req.body)
//     const name = req.body

    
// })




app.listen(PORT,()=>{
    console.log(PORT)
})