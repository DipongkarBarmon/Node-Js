 
//https://www.npmjs.com/
//https://expressjs.com/
//https://nodejs.org/en
//https://www.mockaroo.com/ -> to create fack data
//https://developer.mozilla.org/en-US/docs/Web/API/Headers 
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

//npm init
//npm i nodemon
//npm install express
//npm install mongoose

const express =require("express");
 

const {connectMongoDB}=require('./connection');
const {logReqRes}=require('./middlewares');
const userRouter=require('./routes/user');

 
const Port=8000;
const app= express();

connectMongoDB("mongodb://127.0.0.1:27017/NodeJsMongoBD")
.then(()=>{console.log("MongoDB Connected!")})
.catch((err)=>{console.log("Mongoose Error",err)});

// //Add this line to parse JSON request bodies
 app.use(express.json());
//Middleware - as Plagin
app.use(express.urlencoded({extended:false}));
 

app.use(logReqRes('log.txt'));

app.use('/api/users',userRouter);

app.listen(Port,()=>{console.log(`Server Started at Port: ${Port}`)});



