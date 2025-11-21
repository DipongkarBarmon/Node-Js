// npm install ejs
// npm install uuid


const express=require("express");
const path=require('path');
const session=require('express-session')
const cookieParser = require('cookie-parser');
const {connectMongoDB}=require('./connections');

const {checkForAuthentication,restrictTo}=require('./middleware/auth')
const urlRouter=require('./routes/url');
const staticRouter=require('./routes/staticUrl');
const userRouter=require('./routes/user')

const URL=require('./models/url');
const { ppid } = require("process");

const app=express();

const PORT=8001;

connectMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>{console.log("MongoDB connected!")});

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(session({
   secret:"@dipongkar123",
   resave:false,
   saveUninitialized:true
}));

app.use(checkForAuthentication);


app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

// app.get('/test',async(req,res)=>{
//   const allUrls=await URL.find({});
//   return  res.render("home",{
//     urls:allUrls,
//   });
// }) ai kaj ta static router a krbo

// Protect /url routes so only users with role 'NORMAL' can access them
app.use('/url', restrictTo(['NORMAL','ADMIN']), urlRouter);
app.use('/',staticRouter);
app.use('/user',userRouter);

app.get('/url/:shortId',async(req,res)=>{
       const shortId=req.params.shortId;

       const entry=await URL.findOneAndUpdate({
         shortId
       },{
         $push:{
             visitHistry:{timestamp:Date.now()}
         }
        }, { new: true } )
       if (!entry) {
         //console.log("Short ID not found:", shortId);
         return res.status(404).json({ error: "Short URL not found" });
        }
       res.redirect(entry.redirectURL);
})

app.listen(PORT,()=>{console.log(`Server Started at PORT:${PORT}`)});
