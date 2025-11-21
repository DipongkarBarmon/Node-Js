const { getUser } = require("../service/auth");

// async function restrictToLoggedinUserOnly(req,res,next) {
  
//    const userUid=req.cookies?.uid;
   
//    if(!userUid) return res.redirect('/login');
//    console.log("This is uid:"+userUid);
//    const user=getUser(userUid);
//    //console.log(user);
//    if(!user) return res.redirect('/login');

//    req.user=user;


//   next();
// }
// module.exports={
//   restrictToLoggedinUserOnly,
// }


 function checkForAuthentication(req,res,next) {
  
   const userUid=req.cookies?.uid;
   req.user=null;
   if(!userUid) return next();
   //console.log("This is uid:"+userUid);
   const user=getUser(userUid);
   //console.log(user);
  
   req.user=user;
   next();
}

function restrictTo(roles=[]){
   return function(req,res,next) {
     if(!req.user) return res.redirect('/login')
     if(!roles.includes(req.user.role))return res.redirect('/login')
   return next();
  }
}

module.exports = {
  checkForAuthentication,
  restrictTo,
}

