const AdapterBase = require('./Base');

// data[portIndex * 9 + 1]
const __ACTIVE = 16;
// data[portIndex * 9 + 2]
const __A = 1;
const __B = 2;
const __X = 4;
const __Y = 8;
const __D_L = 16;
const __D_R = 32;
const __D_D = 64;
const __D_U = 128;

// data[portIndex * 9 + 3]
const __S = 1;
const __Z = 2;
const __R = 4;
const __L = 8;

class OfficialAdapter extends AdapterBase {
  processData(data) {
    [0, 1, 2, 3].forEach((portIndex) => {
      this.controllers[portIndex].active = data[portIndex * 9 + 1] === __ACTIVE;
      this.controllers[portIndex].buttonState = {
        // normal buttons
        a: !!(data[portIndex * 9 + 2] & __A),
        b: !!(data[portIndex * 9 + 2] & __B),
        x: !!(data[portIndex * 9 + 2] & __X),
        y: !!(data[portIndex * 9 + 2] & __Y),
        dPadUp: !!(data[portIndex * 9 + 2] & __D_U),
        dPadDown: !!(data[portIndex * 9 + 2] & __D_D),
        dPadLeft: !!(data[portIndex * 9 + 2] & __D_L),
        dPadRight: !!(data[portIndex * 9 + 2] & __D_R),

        l: !!(data[portIndex * 9 + 3] & __L),
        r: !!(data[portIndex * 9 + 3] & __R),
        z: !!(data[portIndex * 9 + 3] & __Z),
        start: !!(data[portIndex * 9 + 3] & __S),

        // analog
        thumbX: data[portIndex * 9 + 4],
        thumbY: data[portIndex * 9 + 5],
        cStickX: data[portIndex * 9 + 6],
        cStickY: data[portIndex * 9 + 7],
        lAnalog: data[portIndex * 9 + 8],
        rAnalog: data[portIndex * 9 + 9]
      };
    });
  }
}

module.exports = OfficialAdapter;
