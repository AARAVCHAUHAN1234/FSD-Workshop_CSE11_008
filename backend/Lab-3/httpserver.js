import http from "http"
import fs from "node:fs/promises";
let port=3001;
const filePath="file.txt";
async function readFile() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return data;
    }

    catch (err) {
        console.log("Error found", err);
    }
}
const content=await readFile();
console.log(content, "12");
const server=http.createServer((req,resp)=>{
        const url= req.url;
        const typ=req.method;
        if(url==="/msg" && typ==="GET"){
            
            resp.statusCode=200;
            // resp.setHeader("Content-Type","text/plain");

            resp.end(JSON.stringify(content));
        }
        else if(url=="/sis" && typ=="GET"){
            
            resp.statusCode=200;
            const userData={"name":"aarav", "id":1223};
            resp.write("OK sis oppen\n");
            // resp.setHeader("Content-Type","text/plain");
            resp.end(JSON.stringify(userData));
        }
        else if(url=="/create" && typ=="POST"){
            let body="";
            let obj={};
            req.on("data",(content)=>{
            body=body+content;
            console.log("d");
            
        });
         req.on("end",()=>{
            const tec=JSON.parse(body);
            obj.push(tec);
            userData.push(obj);
            req.end(JSON.stringify(userData));
         });
        }
});
server.listen(port,()=>{
    console.log(`Server is running ${port}`);
});
console.log(readFile());
