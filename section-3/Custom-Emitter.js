class CustomEmitter {
  constructor() {
    this.listeners = {};
  }
  addListener(type, listenFn) {
    if (typeof listenFn !== "function") {
      throw new Error("Listener should be function");
    }

    this.listeners[type] = this.listeners[type] || [];

    this.listeners[type].push({ listener: listenFn, once: false });
  }

  on(type, listenFn) {
    this.addListener(type, listenFn);
  }

  emit(type, ...args) {
    if (this.listeners[type]) {
      this.listeners[type].forEach((listn) => {
        listn.listener(...args);
      });

      this.listeners[type] = this.listeners[type].filter((l) => !l.once);
    }
  }

  removeListener(type, listenFn) {
    if (this.listeners[type]) {
      const index = this.listeners[type].findIndex(
        (fn) => fn.listener.name === listenFn.name
      );

      if (index > -1) {
        this.listeners[type].splice(index, 1);
      }
    }
  }

  off(type, listenFn) {
    this.removeListener(type, listenFn);
  }

  listenerCount(type) {
    const eventListeners = this.listeners[type] || [];
    return eventListeners.length;
  }

  rawListeners(type) {
    const listns = this.listeners[type] || [];
    return listns.map((l) => l.listener);
  }

  once(type, fn) {
    if (typeof fn !== "function") {
      throw new Error("Listener should be function");
    }

    this.listeners[type] = this.listeners[type] || [];

    this.listeners[type].push({ listener: fn, once: true });
  }
}

const event1 = new CustomEmitter();

function func1() {
  console.log("Function 1");
}
function func2() {
  console.log("Function 2");
}

function func3() {
  console.log("Function 3");
}

event1.on("myEvent", func1);
event1.on("myEvent", func2);
event1.once("myEvent", func3);

console.log(event1.rawListeners("myEvent"));

event1.emit("myEvent");
// event1.off("myEvent", func1);
// event1.off("myEvent", func2);
event1.emit("myEvent");
// event1.emit("myEvent");
// event1.emit("myEvent");
// event1.emit("myEvent");
// event1.emit("myEvent");
