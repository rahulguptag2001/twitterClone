const express= require('express');
const app=express();
const router=express.Router();
const bodyParser=require('body-parser')
const User=require('../../schemas/userSchema');
const Post=require('../../schemas/PostSchema');

app.use(bodyParser.urlencoded({extended: false}))

router.get('/',  (req,res,next)=>{
    
})
router.post('/', async (req,res,next)=>{
    if(!req.body.content){
        console.log('likh to de kuch');
        return res.sendStatus(400);
    }
    let postDate={
        content:req.body.content,
        postedBy:req.session.user
    }
    Post.create(postDate)
    .then(async newPost=>{
        newPost= await User.populate(newPost,{path:"postedBy"})
        console.log(newPost);
        res.status(201).send(newPost);
    })
    .catch( error=>{
        colsole.log(error);
        res.sendStatus(400);
    })
})

module.exports= router; 