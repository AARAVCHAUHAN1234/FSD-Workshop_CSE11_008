import fs from "node:fs/promises";
const filePath="userData.json";

async function createFile(content){
    try{
    await fs.writeFile(filePath,content,"utf-8");
    }
    catch(err){
        console.log("error found",err);
    }
    console.log("File Created Successfully");
    
}
//read file function
async function readFile(){
    try{
    const data= await fs.readFile(filePath,"utf-8");
    console.log(data);
    }
    catch(err){
        console.log("Error found",err);
    }

    console.log("File Completed")
}
async function appendFile(content){
    try{
    await fs.appendFile(filePath,content,"utf-8");
    console.log("file append");
    }
    catch(err){
        console.log("Error found",err);
    }
}

function deleteFile(){
    
     try{
    fs.unlink(filePath);
    }
    catch(err){
        console.log("Error found",err);
    }
    console.log("File Deleted")
    
}
async function sequence(){
    await createFile("First Line of Code \n");
    await appendFile("Second line to append");
    await readFile();
    await deleteFile();

}
sequence();
