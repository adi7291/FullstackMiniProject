//to make our application  Modular scalable,maintainable we use router 
//it used to manage different routes of the application and it helps in organizing code by separating
// the routing logic from main server file

const  router=require('express').Router();

const apiKeyMiddleware=require('../middleware/apikey')

const path=require("path");

// app.get('/', (req,res)=>{
//     res.render('index',{
//         title:"My Home Page",
//         heading:"This is home page from Express js ",
//         paragraph:"learning",
//     });
// })
router.get('/',(req,res)=>{
    res.render('index',{
        title:"My Home Page",
        heading:"This is home page from Express js ",
        paragraph:"learning",
    })
})
router.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Page",
        heading:"This is about page from Express!!",
        subHeading:"learning express template engine"

    })
})



router.get('/download',(req,res)=>{
    res.download(path.join(__dirname , "../asset","th.jpg"));
    // res.download(path.resolve(__dirname)+'../asset/th.jpg');
})

//setting api/product route.
//to use middleware in any route we need to pass as second parameter in the route.
router.get('/api/product',apiKeyMiddleware,(req,res)=>{
    //since this is api request we need to sed json
    res.json([
        {
            id:'123',
            name:"Ram"
        },
        {
            id:'124',
            name:"Sam"
        }
    ])
})

module.exports =router;