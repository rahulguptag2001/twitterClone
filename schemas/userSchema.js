const mongoose=require('mongoose');

const { Schema }=mongoose;

const UserSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:"/images/profilepic.png"
    },
},{ timestamps:true});


let User= mongoose.model("User",UserSchema);

module.exports=User;