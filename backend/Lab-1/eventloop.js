console.log("This is the starting point of my code");
process.nextTick(()=>{
    console.log("This process.nextTick operation")
})
setTimeout(()=>{
    console.log("This is my first timeout operation");
},2000);
console.log("This is the end point of my code"); 
new Promise((resolve,reject)=>{
    let success=true;
    if(success) resolve("Data loaded succecfully");
    else reject("Data loading failed");
})
// process.nexxttick has higher priority or promise. it depends on the envioronment of the system..
//is module is used then promise and if 