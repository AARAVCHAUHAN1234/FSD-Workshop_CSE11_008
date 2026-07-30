// event emmitter
import EventEmitter from "node:events";
const myEmitter=new EventEmitter();
myEmitter.on("greet",(teacher)=>{
    console.log(`class started by ${teacher}`);
});
myEmitter.on("exit",(teacher)=>{
    console.log(`class finished by ${teacher}`);
});
myEmitter.emit("greet","Chandrahas Sir");
myEmitter.emit("exit","Chandrahas Sir");

myEmitter.on("Game",(me)=>{
    console.log(`i am playing A GAME ${me}`);
});
myEmitter.emit("Game","FORTNITE");
