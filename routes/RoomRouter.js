const express = require("express");
const router = express.Router();
const room = require("../Controllers/RoomController");

router.post("/new", room.addRoom);
router.get("/find", room.findRoom);
router.get("/:id", room.listRooms);
router.get("/:id/bookings", room.listroomBookings);
router.get("/view/:id/bookings", room.viewRoomBookings);

module.exports = router;
