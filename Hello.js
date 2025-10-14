/**
 lecture 1
console.log("Hello Node js!");

//all dom in javascript related thinks are exclude form node js

//console.log(window); //window is not defined

//console.log(alert("Hi!")); //alert is not defined


//npm -> node pakage manager
//npm init -> npm initialize .it create a tamplate or file to do run the project
// To create new project ,at first we should init npm
// package name: choose any (default folder name)
//version:1.0.0
//discrition: you say any
//entry point: where start form fisrt like Hollo.js
//some kind of more info need 
//then it create package.json
// in package have script we can write own script like "start":"node Hello.js"
// we can run Hello.js as npm start except node Hello.js
 */

/** 
  lecture 2: Module
  
 */
console.log("Hi!");

 
//console.log(add(2,3));// add is not defined; it not present in Hello.js

//now it add functoion present in Math.js
//how to ues this add function? we neet to use require("Path") this is import function. path:"./Math" say current directory and path : "fs" say build in packages we use it
const math = require("./Math");
console.log(math);
console.log("Math value is :",math.add(1,3));

// const a=require("http"); //build in package
// console.log(a);
