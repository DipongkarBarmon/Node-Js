 
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
const fs=require("fs");
 
const { json } = require("stream/consumers");
const { default: mongoose } = require("mongoose");
 
const Port=8000;
const app= express();

mongoose
.connect("mongodb://127.0.0.1:27017/NodeJsMongoBD")
.then(()=>{console.log("MongoDB Connected!")})
.catch((err)=>{console.log("Mongoose Error",err)});

const userSchema=new mongoose.Schema({
   first_name:{
     type:String,
     require:true
   },
   last_name:{
     type:String
   },
   email:{
    type:String,
    require:true,
    unique:true
   },
   gender:{
    type:String
   },
   job_title:{
     type:String
   }
},{timestamps:true});

const user = mongoose.model("user",userSchema);

//Add this line to parse JSON request bodies
app.use(express.json());
//Middleware - as Plagin
app.use(express.urlencoded({extended:false}));

// app.use((req,res,next)=>{
//    console.log("Hello Middleware 1");
//    //req.Myname="Dip"//it exit in below everywhere;
//    next();

// })
// app.use((req,res,next)=>{
//    console.log('Middleware 2');
//    //console.log("My name is ",req.Myname);
//    return res.end("Hey");
   
// })


app.use((req,res,next)=>{
  fs.appendFile('log.txt',`\n${Date.now()}:${req.ip} ${req.method}: ${req.path}\n`,(err,data)=>{
      next();
  });
 
})

app.get('/users',async(req,res)=>{
   const alluser=await user.find({});
   const html=`
     <table>
        <tr>
           <th>ID</th>
           <th>Fisrt Name</th>
           <th>Last Name</th>
           <th>Email</th>
           <th>Gender</th>
           <th>Job Title</th>

        </tr>
         ${alluser.map(user=>`
           <tr>
              <td>${user.id}</td>
              <td>${user.first_name}</td>
              <td>${user.last_name}</td>
              <td>${user.email}</td>
              <td>${user.gender}</td>
              <td>${user.job_title}</td>
           </tr>
          `).join("")}
     </table>
  
   `
   
   return res.send(html);
})

app.get('/api/users',async(req,res)=>{
    //res.setHeader("X-Myname","Dipongkar");//coustom header //it show in response header
   //always add X to coustom headers
   //console.log(req.headers); // it show in request header

   const alluser=await user.find({});
   return res.json(alluser);
})

//we combin get ,patch ,delete beause of same path user route
app
.route('/api/users/:id')
.get(async(req,res)=>{
   //const id=Number(req.params.id);
   //const user=users.find(user=> user.id==id);
   //Form mongo
   const Auser=await user.findById(req.params.id);
   if(!Auser) return res.status(404).json({error:"User Not Found"})
   return res.json(Auser);

})
.patch(async(req,res)=>{
  //Edit user with id
  // const id=req.params.id;
  // const updatadData=req.body;
  // //find user index to update
  // const index=users.findIndex(user=>user.id==id);
  
  // if(index==-1){
  //   return res.status(404).json({status:"Error",message:"User not fund"});
  // }
  // users[index]={...users[index],...updatadData}

  //   fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
  //    if(err){
  //       return res.status(500).json({status:"Error",message:err.message});
  //    }
     
  //     return res.json({status:"Success",message:`User ${id} updated successfully`});
  // });

  //using mongo
 
   await user.findByIdAndUpdate(
    req.params.id,
    {last_name:"Rani"}
  );
  return res.json({status:"Success",message:`User ${req.params.id} updated successfully`});
})
.delete(async(req,res)=>{
  //Delete user with id
  // const id =Number(req.params.id);
  // users=users.filter(user=>user.id!=id)
  // fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
  //     return res.json({status:"Success"});
  // });
  
  //using mongo
  await user.findByIdAndDelete(req.params.id);
  return res.json({status:"Success"});
})

app.post('/api/users',async (req,res)=>{
  //TODO :Create new user
   const body=req.body; 
   //console.log(body);
   if(!body || !body.first_name ||!body.job_title||!body.last_name||!body.email||!body.gender){
      return res.status(400).json({message:"All fields are require.."});
   }
  //  users.push({id:users.length+1, ...body});
  //  fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
  //      return res.status(201).json({status:"Succes!",message:`User ${users.length+1} create successfully`status:"Succes!",message:`User ${users.length+1} create successfully`});
  //  })

  //MongoDB
  const result=await user.create({
    first_name:body.first_name,
    last_name:body.last_name,
    email:body.email,
    gender:body.gender,
    job_title:body.job_title
  })
  //console.log(result);
  return res.status(201).json({status:"Succes!",message:`User  create successfully`})
   
})
app.listen(Port,()=>{console.log(`Server Started at Port: ${Port}`)});



