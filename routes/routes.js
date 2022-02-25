const router = require("express").Router();

const c = require("../controllers/priceController");

router.get("/", c.getPrice);

module.exports = router;
