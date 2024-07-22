const productRouter = require('express').Router();

const productData=require('../productData');


productRouter.get('/product',(req,res)=>{
    res.render('product',{
        title:"Product Page",
        heading:"Our Products"
    })
    
})

productRouter.get('/api/products',(req,res)=>{
    // console.log("product")
    // res.send(productData); cannot be done in this way.
    res.json(productData)
})

productRouter.post('/api/products',(req,res)=>{
    console.log('product request')
    console.log(req);
   return res.json({})
})

module.exports=productRouter;