//https://www.npmjs.com/
//https://expressjs.com/
//https://nodejs.org/en
//https://www.mockaroo.com/ -> to create fack data
//https://developer.mozilla.org/en-US/docs/Web/API/Headers 
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
//npm i nodemon

const express =require("express");
const fs=require("fs");
let users=require("./MOCK_DATA.json");
const { json } = require("stream/consumers");
 
const Port=8000;
const app= express();
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

app.get('/users',(req,res)=>{
    
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
         ${users.map(user=>`
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

app.get('/api/users',(req,res)=>{
    res.setHeader("X-Myname","Dipongkar");//coustom header //it show in response header
   //always add X to coustom headers
   //console.log(req.headers); // it show in request header
   return res.json(users);
})

//we combin get ,patch ,delete beause of same path user route
app
.route('/api/users/:id')
.get((req,res)=>{
   const id=Number(req.params.id);
   
   const user=users.find(user=> user.id==id);
   if(!user) return res.status(404).json({error:"User Not Found"})
   return res.json(user);

})
.patch((req,res)=>{
  //Edit user with id
  const id=req.params.id;
  const updatadData=req.body;
  //find user index to update
  const index=users.findIndex(user=>user.id==id);
  
  if(index==-1){
    return res.status(404).json({status:"Error",message:"User not fund"});
  }
  users[index]={...users[index],...updatadData}

    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
     if(err){
        return res.status(500).json({status:"Error",message:err.message});
     }
     
      return res.json({status:"Success",message:`User ${id} updated successfully`});
  });
})
.delete((req,res)=>{
  //Delete user with id
  const id =Number(req.params.id);
  users=users.filter(user=>user.id!=id)
  fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
      return res.json({status:"Success"});
  });
})

app.post('/api/users',(req,res)=>{
  //TODO :Create new user
   const body=req.body; 
   //console.log(body);
   if(!body || !body.first_name ||!body.job_title||!body.last_name||!body.email||!body.gender){
      return res.status(400).json({message:"All fields are require.."});
   }
   users.push({id:users.length+1, ...body});
   fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
       return res.status(201).json({status:"Succes!",message:`User ${users.length+1} create successfully`});
   })
   
})
app.listen(Port,()=>{console.log(`Server Started at Port: ${Port}`)});



