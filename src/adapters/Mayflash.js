const AdapterBase = require('./Base');

// data[1]
const __X = 1;
const __A = 2;
const __B = 4;
const __Y = 8;
const __L = 16;
const __R = 32;
const __Z = 128;

// data[2]
const __S = 2;
const __D_U = 16;
const __D_R = 32;
const __D_D = 64;
const __D_L = 128;

class MayflashAdapter extends AdapterBase {
  processData(data) {
    this.controllers[data[0] - 1].active = true;
    this.controllers[data[0] - 1].buttonState = {
      // normal buttons
      a: !!(data[1] & __A),
      b: !!(data[1] & __B),
      x: !!(data[1] & __X),
      y: !!(data[1] & __Y),
      z: !!(data[1] & __Z),
      l: !!(data[1] & __L),
      r: !!(data[1] & __R),

      dPadUp: !!(data[2] & __D_U),
      dPadDown: !!(data[2] & __D_D),
      dPadLeft: !!(data[2] & __D_L),
      dPadRight: !!(data[2] & __D_R),
      start: !!(data[2] & __S),

      // analog
      thumbX: data[3],
      thumbY: 256 - data[4], // y is inverted in mayflash land
      cStickX: data[6],
      cStickY: 256 - data[5], // y is inverted in mayflash land
      lAnalog: data[7],
      rAnalog: data[8]
    };
  }
}

module.exports = MayflashAdapter;
