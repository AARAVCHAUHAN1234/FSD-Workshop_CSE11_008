
import EventEmitter from "node:events";

const myEmitter = new EventEmitter();

function createDomElements() {
  return {
    addEventListener(event,listener) {
      myEmitter.on(event,listener);
    },

    removeEventListener(event,listener) {
      myEmitter.off(event,listener);
    },

    dispatchEvent(event,listener) {
      myEmitter.emit(event,listener);
    },
  };
}

const button = createDomElements();

button.addEventListener("click", () => {
        console.log("Mouse Click");
      });    

function handleCLick(event){
    console.log("FIle clicked");
}
button.addEventListener('click',handleClick);
