const express = require("express");
const router = express.Router();
const LoanController = require("../controllers/loanController");
const auth = require("../middleware/auth");

router.post("/", LoanController.issueBook);
router.put("/:id/return", LoanController.returnBook);
router.get("/", LoanController.getAllLoans);
router.get("/overdue", LoanController.getOverdueLoans);
router.post("/:id/fine", LoanController.payFine);
router.post("/borrow", auth, LoanController.borrowBook);
router.get("/borrowed", auth, LoanController.getBorrowedBooks);
router.put("/return/:id", auth, LoanController.returnBook);

module.exports = router;
