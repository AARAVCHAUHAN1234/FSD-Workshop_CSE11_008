console.log("This is the starting point of my code");
process.nextTick(()=>{
    console.log("This process.nextTick operation")
})
setTimeout(()=>{
    console.log("This is my first timeout operation");
},2000);
console.log("This is the end point of my code");