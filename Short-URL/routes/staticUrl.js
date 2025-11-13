const express = require('express');
const URL = require('../models/url');
const {restrictTo}=require('../middleware/auth')
const router = express.Router();

router.get('/admin/urls',restrictTo(['ADMIN']),async(req,res)=>{
   const id=req.session.shortId;
   const allusers=await URL.find({});
   return res.render('home',{
      id,
      urls:allusers
   })
})
router.get('/',restrictTo(['NORMAL','ADMIN']) ,async(req, res) => {
    // Get shortId from session
    const id = req.session.shortId;
   // Fetch all URLs to show on the home page.
   const allUrls = await URL.find({createdBy:req.user._id});
   return res.render('home', {id, urls: allUrls });
})

router.get('/signup', (req, res) => {
   return res.render('signup');
})
router.get('/login', (req, res) => {
   return res.render('login');
})
module.exports = router;