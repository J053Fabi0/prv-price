const variables = require("./utils/variables");
const { usdtPRVPair } = require("./utils/constants");
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

    variables.price = parseFloat(moveDecimalDotString(Math.floor((usdt * 1_000 * prvDivider) / prv), -9));
  } catch (e) {
    console.error(e);
  }
}
