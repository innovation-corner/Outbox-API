const express = require("express");
const router = express.Router();
const business = require("../Controllers/BusinessController");

router.put("/edit/:id", business.edit);
router.get("/:id/users", business.listUsers);
router.get("/:id/locations", business.viewAllBusinessLocations);

module.exports = router;
