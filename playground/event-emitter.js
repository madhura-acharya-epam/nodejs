const { EventEmitter } = require("events");

// const eventEmitter = new EventEmitter();

// eventEmitter.on("myEvent", () => {
//   console.log("event received!!");
// });

// eventEmitter.emit("myEvent");

// eventEmitter.on("myEvent", () => {
//   console.log("event 2");
// });

// const evt1 = new EventEmitter();
// evt1.on("myEvent", () => {
//   console.log("event1");
// });

// const evt2 = new EventEmitter();
// evt2.on("myEvent", () => {
//   console.log("event2");
// });
// evt2.emit("myEvent");
const eventEmitter = new EventEmitter();
function func1() {
  console.log("EVENT TRIGGERED");
}
function func2() {
  console.log("Event func2");
}

eventEmitter.on("myEvent", func1);
eventEmitter.on("myEvent", func2);

console.log("raw", eventEmitter.rawListeners("myEvent"));
// eventEmitter.once("myEvent", func1);
// eventEmitter.once("myEvent", func2);

// console.log(eventEmitter.listenerCount("myEvent"));

// eventEmitter.emit("myEvent");
// console.log("----------------");
// eventEmitter.emit("myEvent");
// eventEmitter.emit("myEvent");
// eventEmitter.on("myEvent2", func1);
// eventEmitter.on("myEvent", func2);
// console.log(eventEmitter.eventNames());
// eventEmitter.removeListener("myEvent", () => {
//   console.log("Removed listener");
// });
// console.log(eventEmitter.eventNames());

// eventEmitter.removeListener("myEvent", func1);
// eventEmitter.removeListener("myEvent", func2);
// console.log(eventEmitter.eventNames());
