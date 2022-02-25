const variables = require("./utils/variables");
const { usdtPRVPair, maxPrices } = require("./utils/constants");
const { moveDecimalDotString } = require("./utils/numbersStrings");
const getFullpDEXStatusV3 = require("./utils/getFullpDEXStatusV3");

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

    variables.addPrice(usdt, prv);

    console.log(variables.prices);
  } catch (e) {
    console.error(e);
  }
}
