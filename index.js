const express = require("express");

const app=express();

const PORT=process.env.PORT || 3000;
const path=require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


//=================================================================================================================================
// Middleware = which comes in middle of something here between req and response.In URL we send and API_KEY. localhost:3000/api/product?api_key=1234567
//if we press enter we will get error Cannot GET /api/product because we don't have that api/product route defined yet in the backend.
//we will define the route first and with url we will send api_key and with the help of the middleware we will check whether the api_key exist or not
//and if the api_key exist whether it is valid or not if it is valid we process the request or if it is not valid we will return an error.

//1. setting api route in route/index.js folder
//2. after setting route wee need to define middleware function and export it create a folder for middleware ane create a file apikey.js




//===========================================close middleware=======================================================================

//================================================================================================================
const mainRouter=require('./routers/index');
const apiKey = require("./middleware/apikey");
const productsRoute = require("./routers/productRouter");
//now we are implementing router in our application which will lead us to remove all routing code to different folder router
//and we need to export that file and just have to use in the main server file.

app.use(mainRouter);
//the about page is not working now because we have not created any routing for the about page in the index.js for the router.
// we can use prefix for the main router ar any router
// app.use('/en',mainRouter);
//importing productRouter we can set multiple Router
app.use(productsRoute);

//================================================================================================================
//=================================================================================================================
//we have to set template engin.(go to line template engin comment)
// app.set('view engine',"ejs")
// console.log(app.get("view engine"))//ejs

// app.set('view engine');
// console.log(app.get('public'));//undefined


app.set('view engine','ejs');
console.log(app.get('views'));//C:\Users\ram17\OneDrive\Desktop\server\views => gives the path of the views folder. by default the views is the
// folder defined for the  template engin to set the views folder and move the .html file inside it with extension .ejs
//====================================================================================================================

//this is static middle ware used for projecting the static page to the client without defining the root for the individual pages.
// but for navigation on each of the page we need to add .htm
// app.use(express.static('public'));
//again after creating app.js file which will be the static file for my all react pages and to populate the public file we need to 
//use in server application
app.use('/public',express.static('public'));


//=====================================================
//we send JSON data from our client but express by default do not accept JSON data so we need to apply middleware so express can understand the JSON data.
app.use(bodyParser.json());
// app.use(cors()); 
// app.use(express.json());

//to resolve cannot get/ we need to create route
// to send the normal string
// app.get('/',(req,res)=>res.send("this is home page"));

//to send the html tag
// app.get('/',(req,res)=>res.send("<h1>This is home page.</h1>"));

// to send file to the client
// app.get('/',(req,res)=>{
//     res.sendFile(path.resolve(__dirname)+'/index.html')
// })
//to get file on the client about.html
// app.get('/about',(req,res)=>{
//     res.sendFile(path.resolve(__dirname)+'/about.html')
// })


//===========================================================================================================
//to download any page image or any file
// app.get('/download',(req,res)=>{
//     res.download(path.resolve(__dirname)+'/asset/th.jpg');
// })
// when we placed the above code we was getting error :Error: ENOENT: no such 
// file or directory, stat 'C:\Users\ram17\OneDrive\Desktop\server\routers..\asset\th.jpg'
// this errors are rendered because we are not serving the static file we need to serve the static field
//===============================================================================================================

//Here we have multiple page which we are sending by there path name and these pages are static page means there are no JS 
// JS involve in it or data is not changing . 
// to render dynamic page we need to use template engine.Because of template engin we can project a folder to client and do the data 
// changing or create the dynamic pages.
//npm install ejs(template engin) ..... after using template engine we can avoid setting the route for the individual page.

//We need to Move this code to router file to make the main server file clean and organized.
// app.get('/', (req,res)=>{
//     res.render('index',{
//         title:"My Home Page",
//         heading:"This is home page from Express js ",
//         paragraph:"learning",
//     });
// })
// app.get('/about',(req,res)=>{
//     res.render('about',{
//         title:"About Page",
//         heading:"This is about page from Express!!",
//         subHeading:"learning express template engine"
//     })
// })
//In the .html file or .ejs file we can have lots of things which are repeating on multiple page like navigation bar, 
// meta tags is head and css file side bar etc.. for that we can create a common folder and add the common.ejs file 
// and include those in all the individual page.

app.listen(PORT,()=>{
    console.log(`Listening to ${PORT} PORT.` )
})