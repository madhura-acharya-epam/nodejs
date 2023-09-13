class CustomEmitter {
  constructor() {
    this.listeners = {};
    /*
      {
        event1: [
          () => {},
          () => {},

        ]
      }
    */
  }
  addEventListener(type, listenFn) {
    if (typeof listenFn !== "function") {
      throw new Error("Listener should be function");
    }

    this.listeners[type] = this.listeners[type] || [];

    this.listeners[type].push(listenFn);
  }

  on(type, listenFn) {
    this.addEventListener(type, listenFn);
  }

  emit(type, ...args) {
    if (this.listeners[type]) {
      this.listeners[type].forEach((listener) => {
        listener(...args);
      });
    }
  }

  off(type, listenFn) {
    if (this.listeners[type]) {
      const index = this.listeners[type].findIndex(
        (fn) => fn.name === listenFn.name
      );

      if (index > -1) {
        this.listeners[type].splice(index, 1);
      }
    }
  }

  listenerCount(type) {
    const eventListeners = this.listeners[type] || [];
    return eventListeners.length;
  }

  rawListeners(type) {
    return this.listeners[type] || [];
  }

  //:TO-DO
  once(type, fn) {
    this.on(type, fn);
  }
}

const event1 = new CustomEmitter();

function func1() {
  console.log("Function 1");
}
function func2() {
  console.log("Function 2");
}

event1.on("myEvent", func1);
event1.on("myEvent", func2);

console.log(event1.rawListeners("myEvent"));

// event1.emit("myEvent");
// event1.off("myEvent", func1);
// event1.off("myEvent", func2);
// event1.emit("myEvent");
// event1.emit("myEvent");
// event1.emit("myEvent");
// event1.emit("myEvent");
// event1.emit("myEvent");
