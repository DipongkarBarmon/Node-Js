const URL=require('../models/url')
const shortid=require('short-id');

async function handleGenerateNewShortUrl(req,res) {
    const body=req.body;
    if(!body.url){
      return res.status(400).json({error:"URL is required!"});
    }
    const shortId = shortid.generate();
    
    await URL.create({
         shortId:shortId,
         redirectURL:body.url,
         visitHistry:[],
         createdBy:req.user._id,
    });

    // Store shortId in session before redirect
    req.session.shortId = shortId;
    return res.redirect('/');
}


async function handleGetAnalytics(req,res) {
      const shortId=req.params.shortId;
      const result=await URL.findOne({shortId});

      return res.json({totalClicks:result.visitHistry.length,analytics:result.visitHistry})
}

module.exports={
  handleGenerateNewShortUrl,
  handleGetAnalytics,
}