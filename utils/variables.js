let dirty = false;
let meanPrice = 0;
const prices = [];
const prvDivider = 1_000_000_000;
const { maxPrices } = require("./constants");
const { moveDecimalDotString } = require("./numbersStrings");

module.exports = {
  get latestSinglePrice() {
    return this.prices[0] || 0;
  },

  get meanPrice() {
    if (dirty) {
      meanPrice =
        Math.floor((this.prices.reduce((p, c) => p + c, 0) / prices.length) * 1_000_000_000) / 1_000_000_000;
      // Set dirty to false, so that next time, if data hasn't changed, you don't need to calculate the mean again
      dirty = false;
    }

    return meanPrice;
  },

  get prices() {
    return prices;
  },

  addPrice: function (usdt, prv) {
    // Insert the new price at the start of the prices array, and if the new size is greater than maxPrices,
    // pop the last price.
    if (
      prices.unshift(parseFloat(moveDecimalDotString(Math.floor((usdt * 1_000 * prvDivider) / prv), -9))) >
      maxPrices
    )
      prices.pop();

    dirty = true;
  },
};
