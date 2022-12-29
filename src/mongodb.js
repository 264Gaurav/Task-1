const mongoose=require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/LoginSignApp')
.then(()=>{
    console.log("mongodb connected");
})

.catch(()=>{
    console.log("faild to connect");
})

    // Schema for file input user data

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirm:{
        type:String,
        required:true
    }
})

//    collection 

const collection=new mongoose.model("LoginCollection",LogInSchema)

module.exports=collection

