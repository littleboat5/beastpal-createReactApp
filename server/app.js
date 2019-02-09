require('dotenv').config();

const express = require("express");
const routes = require('./routes/');  // routes/index.js
const bodyParser = require("body-parser"); //so we can use req.body in the POST route
const mongoose = require("mongoose");  // mongoDB modeling tool
const cors = require('cors');
const helmet = require('helmet');
const cloudinary = require('cloudinary');
const path = require('path')

const app = express();
const router = express.Router();

/*===============  configure cloudinary =============== */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/*=============== connect to DB =============== */
//enviroment variable DATABASEURL is set on Heroku, if can't find it, must be running local
const dburl = process.env.DATABASEURL;
// const dburl = "mongodb://admin:beast2@ds125385.mlab.com:25385/beastpal"

try {
  mongoose.connect(dburl, {useNewUrlParser: true});
} catch (error){
  console.log(error);
}

/*============= set up routes {API Endpoints} ============*/
routes(router);

/*=============== setup middlewares =============== */
app.use(cors()); //prevents cross-origin request errors
// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(helmet()); //armours our API to prevent attacks


app.use('/api', router); // append '/api' in front of all routes

/*============== start server ==================*/
let port = process.env.PORT || 5000;

// tell express to listen for requests
app.listen(port, ()=>{
    console.log(dburl);
    console.log(`beastpal server started at port: ${port}`);
});
