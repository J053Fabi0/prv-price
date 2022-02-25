const variables = require("../utils/variables");
const handleError = require("../utils/handleError");

const sleep = require("util").promisify(setTimeout);

const a = {};

a.getLatestSinglePrice = async (_, res) => {
  try {
    while (variables.latestSinglePrice === 0) await sleep(200);

    res.send({ message: variables.latestSinglePrice });
  } catch (e) {
    handleError(res, e);
  }
};

a.getMeanPrice = async (_, res) => {
  try {
    while (variables.meanPrice === 0) await sleep(200);

    res.send({ message: variables.meanPrice });
  } catch (e) {
    handleError(res, e);
  }
};

module.exports = a;
