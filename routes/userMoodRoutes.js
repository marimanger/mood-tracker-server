const router = require("express").Router();
const userMoodControl = require("../controllers/userMoodControl");

// User mood tracker routes
router.get("/mood-user", userMoodControl.getUserMoods);
router.post("/mood-user", userMoodControl.addNewMood);
router.put("/mood-user/:id", userMoodControl.editMood);

module.exports = router;
