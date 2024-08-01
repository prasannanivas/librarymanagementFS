const express = require("express");
const router = express.Router();
const AuthorController = require("../controllers/authorController");

router.post("/", AuthorController.addAuthor);
router.get("/", AuthorController.getAllAuthors);
router.put("/:id", AuthorController.updateAuthor);
router.delete("/:id", AuthorController.deleteAuthor);

module.exports = router;
