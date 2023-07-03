const express = require("express");
const dataController = require("../controller/dataController");

const router = express.Router();

router.get("/get", dataController.getAllData);
router.post("/post", dataController.create);
router.get("/get/date", dataController.getByDate);
router.delete("/delete", dataController.deleteData);

module.exports = router;
