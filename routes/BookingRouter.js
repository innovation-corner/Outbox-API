const express = require("express");
const router = express.Router();
const book = require("../Controllers/BookingController");

router.post("/room/:id", book.placeBooking);
router.put("/room/update/:id", book.editBooking);
router.delete("/room/cancel/:id", book.cancelBooking);
router.get("/room/:id", book.viewBooking);

module.exports = router;
