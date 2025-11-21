const express=require('express')
const {handleUploadFile}=require('../controller/uploadFile')
const router=express.Router()

router.post('/',handleUploadFile)

module.exports=router