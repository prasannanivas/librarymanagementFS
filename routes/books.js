const express = require("express");
const router = express.Router();
const BookController = require("../controllers/bookController");
const auth = require("../middleware/auth");

router.post("/", auth, BookController.addBook);
router.get("/", auth, BookController.getAllBooks);
router.get("/:id", auth, BookController.getBook);
router.put("/:id", auth, BookController.updateBook);
router.delete("/:id", auth, BookController.deleteBook);
router.put("/:id", auth, BookController.editBook);
router.get("/search", auth, BookController.searchBooks);

module.exports = router;
