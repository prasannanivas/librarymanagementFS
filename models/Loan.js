const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  issuedAt: { type: Date, default: Date.now },
  dueDate: {
    type: Date,
    required: true,
    default: () => Date.now() + 14 * 24 * 60 * 60 * 1000,
  }, // Default due date is 14 days from issue date
  returnedAt: { type: Date },
  fineAmount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Loan", LoanSchema);
