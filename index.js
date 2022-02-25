require("./loadPrice")();

/*
 * Exrpess
 */
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("cors")());

app.use(require("./routes/routes"));

const { address } = require("ip");
const activateServer = (port) =>
  app
    .listen(port, () => console.log(`Server on http://${address()}:${port}`))
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log("Error EADDRINUSE on port " + port);
        activateServer(port + 1);
      }
    });
activateServer(3023);
