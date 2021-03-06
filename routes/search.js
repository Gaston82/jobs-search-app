const { Router } = require("express");
const { search } = require("../controllers/search");
const router = Router();

router.get("/:query", search);

module.exports = router;
