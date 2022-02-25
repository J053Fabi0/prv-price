const axios = require("axios");

module.exports = async (height = 0) => {
  const options = {
    method: "post",
    url: "https://beta-fullnode.incognito.org/fullnode",
    data: {
      id: 1,
      jsonrpc: "1.0",
      method: "pdexv3_getState",
      params: [
        {
          BeaconHeight: height,
          Filter: {
            Key: "All",
            Verbosity: 0,
            ID: "",
          },
        },
      ],
    },
  };

  const res = await axios(options);

  if (res.data.Error) throw new Error(res.data.Error.StackTrace);
  return res.data.Result;
};
