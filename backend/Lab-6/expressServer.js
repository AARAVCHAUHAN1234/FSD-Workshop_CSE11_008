// npm install express dotenv
import express from "express";
import cors from "cors";
const userData=[{
    id:1,
    name:"Aarav",
    age:19
}];

const port=3000;
const app=express();   // create app is used to act as a instance for express.



app.use(cors());
app.use(express.json());
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})
//using get
app.get("/msg",(req,res)=>{
    res.end("Welcome to the express");

});
app.get("/user",(req,res)=>{
    res.end(JSON.stringify(userData));
});
app.get("/user/:id",(req,res)=>{
    
    const id=req.params.id;
    const user=userData.find((u)=>u.id==id);
    if(!user){
        return res.status(400).json({message:"User Not Found"});
    }
    return res.status(200).json({message:"Data Recieved",user});
});
//using post
app.post("/create",(req,res)=>{
    try{
    let {id,name,age}=req.body;
    
    let data={
        id,
        name,
        age
    };
    userData.push(data);
    res.end("Data added");
}
catch(err){
    console.log(err);
    res.end(err);
}
});

//using put
app.put("/put/:id",(req,res)=>{ 
    const id=req.params.id;
    const user=userData[id-1];
    let {name,age}=req.body;
    if (!user) {
    return res.status(404).json({ message: "User Not Found" });
}
    user.name = name;
    user.age = age;
    return res.status(200).json({message:"Data Changed"});
});

//using delete
app.delete("/delete/:id",(req,res)=>{ 
    const id=req.params.id;
    let user=userData[id-1];
    if (!user) {
    return res.status(404).json({ message: "User Not Found" });
}
    delete userData[id-1] ;
    return res.status(200).json({message:"Data Delelted is",user});
});
app.get("/userbyid/:id",(req,res)=>{
    try{
        const id=req.params.id;
        let user=userData.find((u)=>u.id==id);
        if(!user){
            res.status(400).json({message:"user not found"});
            res.end("NOt found");    
        }
        else{
            res.status(202).json({message:"user found",user});
            res.end("NOt found");  
        }
    }
    catch(err){
        console.log("error",err);
    }

});
