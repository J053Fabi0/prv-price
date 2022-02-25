const variables = require("../utils/variables");
const handleError = require("../utils/handleError");

const sleep = require("util").promisify(setTimeout);

const a = {};

a.getPrice = async (_, res) => {
  try {
    while (variables.price === 0) await sleep(100);

    res.send({ message: variables.price });
  } catch (e) {
    handleError(res, e);
  }
};

module.exports = a;
