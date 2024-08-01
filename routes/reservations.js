const express = require("express");
const router = express.Router();
const ReservationController = require("../controllers/reservationController");

router.post("/", ReservationController.reserveBook);
router.delete("/:id", ReservationController.cancelReservation);
router.get("/", ReservationController.getAllReservations);

module.exports = router;
