const variables = require("./utils/variables");
const { usdtPRVPair, maxPrices } = require("./utils/constants");
const { moveDecimalDotString } = require("./utils/numbersStrings");
const getFullpDEXStatusV3 = require("./utils/getFullpDEXStatusV3");

const prvDivider = 1_000_000_000;
const sleep = require("util").promisify(setTimeout);

module.exports = async () => {
  while (true) {
    try {
      await load();
    } catch (e) {
      console.error(e);
    } finally {
      await sleep(40_000);
    }
  }
};

async function load() {
  try {
    const { Token0VirtualAmount: prv, Token1VirtualAmount: usdt } = (await getFullpDEXStatusV3()).PoolPairs[
      usdtPRVPair
    ].State;

    // Insert the new price at the start of the prices array, and if the new size is greater than maxPrices,
    // pop the last price.
    if (
      variables.prices.unshift(
        parseFloat(moveDecimalDotString(Math.floor((usdt * 1_000 * prvDivider) / prv), -9))
      ) > maxPrices
    )
      variables.prices.pop();

    console.log(variables.prices);
  } catch (e) {
    console.error(e);
  }
}
