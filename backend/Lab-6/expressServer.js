// npm install express dotenv
import express from "express";
const userData={
    id:1,
    name:"Aarav",
    age:19
};
const port=3000;
const app=express();    // create app is used to act as a instance for express.
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
    
    const id=1;
    const f=userData.find(id);
    res.end(JSON.stringify(f));
});
//using post
app.post("/create",(req,res)=>{
    try{
    const { id,name, age}=req.body;
    const data={
        id:id,
        name:name,
        age:age
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
//using delete

