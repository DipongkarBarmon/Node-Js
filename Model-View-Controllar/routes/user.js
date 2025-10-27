 
 
 

const express=require("express");
const router=express.Router();

const {handleGetAllUsers,getUserById,updataUserById,deleteUserById,createUser}=require('../controllers/user');

// router.get('/users',async(req,res)=>{
//      const allusers=await User.find({});
//         <table>
//             <tr>
//            <th>ID</th>
//            <th>Fisrt Name</th>
//            <th>Last Name</th>
//            <th>Email</th>
//            <th>Gender</th>
//            <th>Job Title</th>
//         </tr>
//          ${allusers.map(user=>{
//            `<tr>
//               <td>${user.id}</id>
//               <td>${user.first_name}</td>
//               <td>${user.last_name}</td>
//               <td>${user.email}</td>
//               <td>${user.gender}</td>
//               <td>${user.job_title}</td>
//            </tr>`
//          }).join("")}
//         </table>
//      `const User = require("../models/user");
//      return res.send(html);
// })

// Register handlers for root '/'
router.route('/').get(handleGetAllUsers).post(createUser);

router
.route('/:id')
.get(getUserById)
.patch(updataUserById)
.delete(deleteUserById)

module.exports=router;