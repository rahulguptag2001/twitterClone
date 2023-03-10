const express= require('express');
const app=express();
const router=express.Router();
const bodyParser=require('body-parser')
const bcrypt=require('bcrypt');
const User=require('../schemas/userSchema');

app.set("view engine",'pug');
app.set('views','views');

app.use(bodyParser.urlencoded({extended: false}))

router.get('/',  (req,res,next)=>{
    res.status(200).render("login");
})
router.post('/', async(req,res,next)=>{

    let payload=req.body;
    if(req.body.logUserName && req.body.logPassward){
        let user= await User.findOne({
            $or: [
                {userName: req.body.logUserName},
                {email: req.body.logUserName}  
            ]
        })
        .catch((error)=>{
            console.log(error);
            payload.errorMessage="something went wrong."
            res.status(200).render("login",payload);
        });
        console.log(user);
        if(user!=null){
            let result = await bcrypt.compare(req.body.logPassword ,user.password)
            console.log(result);
            if(result===true){
                req.session.user=user;
                return res.redirect("/");
            }
        }
        payload.errorMessage="login credentials incorrect"
        return res.status(200).render("login",payload);
    }
    payload.errorMessage="make sure each feild has a valid value.";
    res.status(200).render("login");
})

module.exports= router; 