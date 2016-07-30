/* eslint-disable global-require */
module.exports = new (class adapters {
  get MayflashAdapter() {
    return require('./Mayflash');
  }

  get OfficialAdapter() {
    return require('./Official');
  }
})();
