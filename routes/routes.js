const router = require("express").Router();

const c = require("../controllers/priceController");

router.get("/", c.getMeanPrice);
router.get("/latest", c.getLatestSinglePrice);

module.exports = router;
