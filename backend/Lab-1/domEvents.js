import {EventEmitter} from "node:events";

const myEmitter = new EventEmitter();

function createDomElements() {
  return {
    addEventListener(event,listener) {
      myEmitter.on(event,listener);
    },

    removeEventListener(event,listener) {
      myEmitter.off(event,listener);
    },

    dispatchEvent(event) {
      myEmitter.emit(event.eventType,event);
    },
  };
}

const button = createDomElements();

button.addEventListener("Click", () => {
        console.log("Mouse Click");
      });    

function handleClick(event){
    console.log("FIle clicked");
}

button.addEventListener('click',handleClick);
button.dispatchEvent({
  eventType:"save"
});
button.dispatchEvent({
  eventType:"Click"
});

//javascript is single threaded and event driven.
//single threaded-> synchoronous 
// event loop asynchronous way me execute
// diff sync and async
// sync call stack
// time taking ops in async mode to do in background. like file opening downloading.
//event loop barbar call stack me check karta rhata h ki empty h ya nhi and this
button.addEventListener('submit',()=>{
  console.log("Submitted");
})
button.dispatchEvent({
  eventType:"submit"
});

