const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors")
const jwt=require("jsonwebtoken")

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/ushadb")
.then(()=>(console.log("db connected")))
.catch(()=>(console.log("db not connected")))


const mySchema=mongoose.Schema({
    name:String,
    pwd:String
})
const user=mongoose.model("user",mySchema);


app.post("/",(req,res)=>{
    const name=req.body.name;
    const pwd=req.body.pwd;
    const skey="anusha121";
    const token=jwt.sign(name,skey)
   const details={
    name:name,
    pwd:token
   }
    const userdetails=new user(details)
    userdetails.save()
    .then(()=>{res.send("success")})
    .catch(()=>{res.send("wrong")})
})

app.listen(3000,()=>{
    console.log("Server started");
})