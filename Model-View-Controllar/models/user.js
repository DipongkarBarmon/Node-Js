const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
  first_name:{
    type:String,
    required:true
  },
  last_name:{
     type:String,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  gender:{
    type:String,
  },
  job_title:{
    type:String
  }

},{timestamps:true});
const User=mongoose.model("user",userSchema);

// Explanation

// mongoose.model() → Creates a model class that allows you to interact with a MongoDB collection.

// First argument "user" → This is the name of the collection (Mongoose will pluralize it to "users" in MongoDB).

// Second argument userSchema → This defines the structure (fields, types, validations) of documents in that collection.

// Result → The User variable now holds a Model object you can use to perform CRUD operations.

module.exports=User;