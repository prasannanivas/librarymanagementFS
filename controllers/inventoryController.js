const Book = require("../models/Book");

exports.getInventoryStatus = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInventoryReports = async (req, res) => {
  try {
    const books = await Book.find();
    // Generate report logic
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
