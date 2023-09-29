const CustomEmitter = require("./Custom-Emitter");

class WithTime extends CustomEmitter {
  async execute(asyncFun, ...args) {
    this.emit("begin");
    await asyncFun(...args);
    this.emit("end");
  }
}

module.exports = WithTime;
