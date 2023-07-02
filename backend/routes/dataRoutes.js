const express = require("express");
const dataController = require("../controller/dataController");

const router = express.Router();

router.get("/get", dataController.getAllData);
router.post("/post", dataController.create);
router.get("/get/symbol/:symbol", dataController.getSymbol);
router.get("/get/time/:time", dataController.getTime);

module.exports = router;
