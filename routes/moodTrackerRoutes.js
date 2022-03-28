const router = require("express").Router();
const fs = require("fs");
const moodController = require("../controllers/moodTrackerControl");

// mood tracker routes
router.get("/mood", moodController.getAllData);


module.exports = router;