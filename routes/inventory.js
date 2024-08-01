const express = require("express");
const router = express.Router();
const InventoryController = require("../controllers/inventoryController");

router.get("/", InventoryController.getInventoryStatus);
router.get("/reports", InventoryController.getInventoryReports);

module.exports = router;
