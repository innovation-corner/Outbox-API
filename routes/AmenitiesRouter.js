const express = require("express");
const router = express.Router();
const amenities = require("../Controllers/AmenitiesController");

router.post("/add", amenities.create);
router.post("edit/:id", amenities.edit);
router.get("/view-all", amenities.viewAll);
router.get("/view/:id", amenities.viewSingle);
router.post("/delete/:id", amenities.delete);

module.exports = router;
