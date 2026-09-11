import express from "express";
import fs from "node:fs/promises";

const userData = "file.json";

async function readFile(filePath) {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        
        console.log("File Read Successfully");
        return data;
    }
    catch (err) {
        console.log("Error found", err);
    }
}

async function writeFile(content) {
    try {
        await fs.writeFile(userData, content, "utf-8");
        console.log("File Appended");
    }
    catch (err) {
        console.log("Error found", err);
    }
}

const port=3000;
const app=express();
app.use(express.json());
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});

app.get("/user",async (req,res)=>{
    const dat= await readFile(userData);
    res.end(dat);
});
app.get("/user/:id", async (req,res)=>{
    
    const id=req.params.id;
    const data= JSON.parse(await readFile(userData));
    const user=data.find((u)=>u.id==id);
    if(!user){
        return res.status(400).json({message:"User Not Found"});
    }
    return res.status(200).json({message:"Data Recieved",user});
});
//using post
app.post("/create",async (req,res)=>{
    try{
    let {id,name,age}=req.body;
    
    let data={
        id,
        name,
        age
    };
    const d=JSON.parse(await readFile(userData));
    
    d.push(data);
    await writeFile(JSON.stringify(d,null,2));
    res.end("Data added");
}
catch(err){
    console.log(err);
    res.end(err);
}
});

//using put
app.put("/put/:id", async (req,res)=>{ 
    const id=req.params.id;
    const data= JSON.parse(await readFile(userData));
    const user=data.find((u)=>u.id==id);
    let {name,age}=req.body;
    if (!user) {
    return res.status(404).json({ message: "User Not Found" });
}
    user.name = name;
    user.age = age;
    await writeFile(JSON.stringify(data,null,2));
    return res.status(200).json({message:"Data Changed"});
});

//using delete
app.delete("/delete/:id",async (req,res)=>{ 
    const id=req.params.id;
    const data= JSON.parse(await readFile(userData));
    const user=data.find((u)=>u.id==id);
    data.splice(user,1);
    if (!user) {
    return res.status(404).json({ message: "User Not Found" });
}
    return res.status(200).json({message:"Data Delelted is",user});
});
