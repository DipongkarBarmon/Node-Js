
//const sessionIdToUserMap=new Map();

// function setUser(id,user){
//    sessionIdToUserMap.set(id,user);
// }
// function getUser(id){
//   return sessionIdToUserMap.get(id);  
// }



const jwt=require('jsonwebtoken');
const secret="@D&ipongakr123"
function setUser(user){
   return jwt.sign( {
     _id:user._id,
     email:user.email,
     role:user.role,
   },secret);
}
function getUser(token){
  if(!token) return null; 
  try {
     return jwt.verify(token,secret);
  } catch (error) {
      
  }
 
}

module.exports={
  setUser,
  getUser
}