const Loan = require("../models/Loan");

exports.issueBook = async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    const loan = new Loan({ bookId, userId });
    await loan.save();
    res.status(201).json({ message: "Book issued successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { returnedAt: Date.now() },
      { new: true }
    );
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOverdueLoans = async (req, res) => {
  try {
    const loans = await Loan.find({
      returnedAt: { $exists: false },
      dueDate: { $lt: Date.now() },
    });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.payFine = async (req, res) => {
  try {
    const { fineAmount } = req.body;
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { fineAmount },
      { new: true }
    );
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Book = require("../models/Book"); // Import the Book model

exports.borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.userId;

    // Check if the book is already borrowed
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.isBorrowed)
      return res.status(400).json({ message: "Book is already borrowed" });

    // Mark the book as borrowed
    book.isBorrowed = true;
    await book.save();

    // Create a loan record
    const loan = new Loan({ bookId, userId, borrowedAt: new Date() });
    await loan.save();

    res.status(201).json({ message: "Book borrowed successfully", loan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get list of borrowed books
exports.getBorrowedBooks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const loans = await Loan.find({ userId }).populate("bookId");
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  try {
    const loanId = req.params.id;
    const loan = await Loan.findById(loanId);
    if (!loan)
      return res.status(404).json({ message: "Loan record not found" });

    // Mark the book as available
    const book = await Book.findById(loan.bookId);
    if (book) {
      book.isBorrowed = false;
      await book.save();
    }

    // Mark the loan as returned
    loan.returnedAt = new Date();
    await loan.save();

    res.json({ message: "Book returned successfully", loan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
