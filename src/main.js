const HID = require('node-hid');
const { MayflashAdapter, OfficialAdapter } = require('./adapters');

const isMayflash = ({ productId, vendorId }) => {
  return productId === 6211 && vendorId === 121;
};

const isOfficial = ({ productId, vendorId }) => {
  return productId === 823 && vendorId === 1406;
};

module.exports.init = () => {
  const outputObj = {
    adapters: [],
    controllers: []
  };
  return HID.devices()
    .filter((d) => isMayflash(d) || isOfficial(d))
    .reduce((output, deviceInfo, idx) => {
      let device;
      if (isMayflash(deviceInfo)) {
        device = new MayflashAdapter(deviceInfo, idx, output);
      }
      else if (isOfficial(deviceInfo)) {
        device = new OfficialAdapter(deviceInfo, idx, output);
      }
      if (device) {
        output.adapters.push(device);
        output.controllers.push.apply(output.controllers, device.controllers);
      }
      return output;
    }, outputObj);
};
