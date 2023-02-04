const mongoose=require('mongoose');
mongoose.set('strictQuery', true);

 class database{

    constructor(){
        this.connect();
    }

    connect(){
        mongoose.connect("mongodb+srv://admin:admin@twitter-clone.tovne49.mongodb.net/?retryWrites=true&w=majority")
        .then(()=>{
        console.log("database connection successful");
        })
        .catch((err)=>{
        console.log("error in databse connection" + err);
        })
    }
}

module.exports=new database();  