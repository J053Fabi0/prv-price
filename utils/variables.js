module.exports = {
  get price() {
    const { length } = this.prices;
    return length === 0
      ? 0
      : Math.floor((this.prices.reduce((p, c) => p + c, 0) / length) * 1_000_000_000) / 1_000_000_000;
  },
  prices: [],
};
