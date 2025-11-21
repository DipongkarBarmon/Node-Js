const fs=require("fs");

 
//synchronous or block operation
//fs.writeFileSync("./test.txt","Hey There");

//asynchronous or non blocking operation
//fs.writeFile("./test.txt","Hey there Asyn",(err)=>{});

// console.log(1);
// const result=fs.readFileSync("./contact.txt","utf-8");
// console.log(result);//threat pool return the response
// console.log(2);
//output: 1 result 2. 2 wait for result.

// console.log(1)
// fs.readFile("./contact.txt","utf-8",(err,result)=>{
//   if(err){
//     console.log("Error",err)
//   }else{
//     console.log(result);
//   }
// })
// console.log(2);
//output 1 2 result

// fs.appendFileSync("./test.txt",`${Date.now()} 197.1.1.0 Hey There\n`);

// fs.cpSync('./test.txt','./copy.txt');

//fs.unlink("./copy.txt",(err)=>{});//asyn

//console.log(fs.statSync("./test.txt"));
//fs.mkdirSync("my-docs");
fs.mkdirSync("my-docs/a/b",{recursive:true})



const os =require("os");
console.log(os.cpus().length);