const Author = require("../models/author");

exports.addAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const author = new Author({ name, bio });
    await author.save();
    res.status(201).json({ message: "Author added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      { name, bio },
      { new: true }
    );
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.json({ message: "Author deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
