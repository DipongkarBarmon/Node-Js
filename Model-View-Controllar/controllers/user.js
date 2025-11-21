
const User=require('../models/user');

async function handleGetAllUsers(req,res){
   const alluser=await User.find({});
   return res.json(alluser);
}

async function getUserById(req,res) {
   const id=req.params.id;
   const Auser=await User.findById(id);
   if(!Auser) return res.status(404).json({error:"User Not Found"});
   return res.json(Auser);
}
async function updataUserById(req,res){
   await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
   return res.json({status:"Success",message:`User ${req.params.id} update successfully.`});
}

async function deleteUserById(req,res){
   await User.findByIdAndDelete(req.params.id);
   return res.json({status:"success"});
} 

async function createUser(req,res){
    const body=req.body;

    if(!body||!body.first_name||!body.last_name||!body.email||!body.gender||!body.job_title){
      return res.status(400).json({message:"All fields are require!"});
    }

    const result=await User.create({
      first_name:body.first_name,
      last_name:body.last_name,
      email:body.email,
      gender:body.gender,
      job_title:body.job_title
    })
    return res.status(201).json({status:"Success!",message:"User created successfully!"});
}
module.exports={
  handleGetAllUsers,
  getUserById,
  updataUserById,
  deleteUserById,
  createUser

}