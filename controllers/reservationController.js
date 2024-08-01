const Reservation = require("../models/Reservation");

exports.reserveBook = async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    const reservation = new Reservation({ bookId, userId });
    await reservation.save();
    res.status(201).json({ message: "Book reserved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: "Reservation cancelled successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
