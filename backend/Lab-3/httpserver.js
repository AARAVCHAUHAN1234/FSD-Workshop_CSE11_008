import http from "http"
let port=3000;
const server=http.createServer((req,resp)=>{
        // resp.write("HEllo World");
        // resp.end();
        const url= req.url;
        const typ=req.method;
        if(url==="/msg" && typ==="GET"){
            resp.write("OK");
            resp.end();
        }
});
server.listen(port,()=>{
    console.log(`Server is running ${port}`);
});
