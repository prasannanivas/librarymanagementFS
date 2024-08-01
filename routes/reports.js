const express = require("express");
const router = express.Router();
const ReportController = require("../controllers/reportController");

router.get("/users", ReportController.getUserActivityReports);
router.get("/borrowings", ReportController.getBorrowingTrends);
router.get("/inventory", ReportController.getInventoryStatus);

module.exports = router;
