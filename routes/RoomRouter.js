const express = require("express");
const router = express.Router();
const room = require("../Controllers/RoomController");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
});

const upload = multer({ storage: storage });

router.post("/new", upload.single('image'), room.addRoom);
router.get("/find", room.findRoom);
router.get("/:id", room.listRooms);
router.get("/:id/bookings", room.listroomBookings);
router.get("/view/:id/bookings", room.viewRoomBookings);

module.exports = router;
