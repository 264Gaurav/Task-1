const express=require("express")
const path=require("path")
const app=express()
const hbs=require("hbs")
const collection=require("./mongodb")

app.use(express.json())
app.use(express.urlencoded({extended:false}))


const tempelatePath=path.join(__dirname,"../tempelates")

const publicPath = path.join(__dirname, '../public')
console.log(publicPath);


app.set("view engine", "hbs")
app.set("views",tempelatePath)
app.use(express.static(publicPath))





app.get("/",(req,res) =>{
    res.render("login")
})
app.get("/signup",(req,res) =>{
    res.render("signup")
})

// for sign up 


app.post("/signup",async(req,res)=>{

        // define data 

    const data={
        name:req.body.name,
        password:req.body.password,
        confirm:req.body.confirm,
    }

        // give data to mongodb

    //  await collection.insertMany([data])


    const checking = await collection.findOne({ name: req.body.name })
    
    try{
    if (checking.name === req.body.name && checking.password===req.body.password) {
        res.send("user details already exists")
    }
    // else{
    //     await collection.insertMany([data])
    // }
   }
   catch{
    // res.send("wrong inputs")
    await collection.insertMany([data])
   }

//     after sign up render 
     
     res.render("login")

})

// for login

app.post("/login",async(req,res)=>{

    try{
        const check=await collection.findOne({name:req.body.name})

        if(check.password===req.body.password){
            res.render("home")
         
        }

        else{
            res.send("Incorrect Password")
        }
    }
    catch{
        res.send("Wrong Details")
    }

})
    





app.listen(3000,()=>{
    console.log("port connected");

})



