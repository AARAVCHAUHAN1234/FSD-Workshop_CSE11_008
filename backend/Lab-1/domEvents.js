
import EventEmitter from "node:events";

const myEmitter = new EventEmitter();

function createDomElements() {
  return {
    addEventListener(eventType) {
      myEmitter.on(eventType, () => {
        console.log("Mouse Click");
      });
    },

    removeEventListener(eventType) {
      myEmitter.removeAllListeners(eventType);
    },

    dispatchEvent(eventType) {
      myEmitter.emit(eventType);
    },
  };
}

const button = createDomElements();

button.addEventListener("click"); 
button.dispatchEvent("click");    

button.removeEventListener("click"); 
button.dispatchEvent("click");       