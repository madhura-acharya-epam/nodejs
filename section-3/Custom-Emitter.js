class CustomEmiiter {
  constructor() {
    this.listeners = {};
  }

  addEventListener(type, listenFn) {
    if (listenFn !== "function") {
      throw new Error("Listener should be function");
    }

    this.listeners[type] = this.listeners[type] || [];

    this.listeners[type].push(listenFn);
  }

  emit(type, ...args) {
    if (this.listeners[type]) {
      this.listeners[type].forEach((listener) => {
        listener(...args);
      });
    }
  }
}

const event1 = new CustomEmiiter();

event1.addEventListener("myEvent", () => {
  console.log("my event");
});

event1.emit("myEvent");
