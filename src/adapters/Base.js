const HID = require('node-hid');
const defaultButtonState = {
  // normal buttons
  a: false,
  b: false,
  x: false,
  l: false, // l trigger button
  r: false, // r trigger button
  y: false,
  z: false,
  start: false,
  dPadUp: false,
  dPadDown: false,
  dPadLeft: false,
  dPadRight: false,

  // analog
  thumbX: 128,
  thumbY: 128,
  cStickX: 128,
  cStickY: 128,
  lAnalog: 0,
  rAnalog: 0
};

class AdapterBase {
  constructor(deviceInfo, idx, existingControllerCount) {
    this.deviceInfo = deviceInfo;
    this.device = new HID.HID(deviceInfo.path);
    this.controllers = [1, 2, 3, 4].map((port) => ({
      id: existingControllerCount + port,
      port,
      active: false,
      adapter: this,
      buttonState: defaultButtonState
    }));
    this.device.on('data', this.processData.bind(this));
  }

  processData() {
    throw new Error('Not Implemented');
  }
}

module.exports = AdapterBase;
