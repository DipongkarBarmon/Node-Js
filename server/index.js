

//to create server we need to use http build in packages
/** 
 
const http =require("http");
const fs=require("fs");
const url=require("url");

 
const myServer=http.createServer((req,res)=>{ //-> this function is handler
  //console.log("New Req Reci..");
  //console.log(req);// request object
  //console.log(req.method);
  if(req.url=='/favicon.ico') return res.end();
  const log=`${Date.now()}: ${req.method} ${req.url} New Request Recived!\n`;
  const myurl=url.parse(req.url,true);
  console.log(myurl);
  fs.appendFile("log.txt",log,(err,data)=>{
      switch(myurl.pathname){
        case '/':res.end("Hello From Server!\n This is our Homepage.");
        break;
        case '/about':
          const username=myurl.query.Name;
          res.end(`Hello From Server!\n This is About Page.\n I'm ${username}`);
        break;
        case '/contact-us':res.end("Hello From Server!\n You can Contact with us.");
        break;
        case '/signup': 
           if(req.method=="GET"){
              res.end("This is signup page");
           }
           else if(req.method=='POST'){
             //DB Query
             res.end("Success");
           }
        default: res.end("404 Not Found");
      }
        
  });
})

//to run server we need port number.
myServer.listen(8000,()=>{console.log("Server Started!")});


//URL -> unifrom resource locator
//example :http://www.piyushgarg.dev/
//http:// ->Protocal: Hyper Text Transfer Protocal
//www.piyushgarg.dev -> Domain : User friendly name of IP address of my server

//http Get ->When we want to get some data from the server
//http Post ->When we want to send data and mute some data in server

*/


const http =require("http");
const express=require("express");


const app=express();

app.get('/',(req,res)=>{
   return res.send("Hello From Home Page!")
})
app.get('/about',(req,res)=>{
  return res.send("Hello From About Page!\n Hi "+req.query.Name)
})

//const myServer=http.createServer(app);
// myServer.listen(8000,()=>{
//   console.log("Server Started!");
// })
//or

app.listen(8000,()=>{console.log("Server Started!")});