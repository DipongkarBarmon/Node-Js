function add(a,b){
  return a+b;
}
// avobe this function need to exports to use anther file like Hello.js
//to exports function we use module.exports
 
//module.exports="Dip"; it return Dip
function sub(a,b){
  return a-b;
}

// module.exports=add;//it override by sub
// module.exports=sub; 

module.exports={
  add,sub
  //change the name
  // addfn:add,
  // subfn:sub
}
//onther way
// exports.add=(a,b)=> a+b;
// exports.sub=(a,b)=> a-b;
//exports.add=add;

