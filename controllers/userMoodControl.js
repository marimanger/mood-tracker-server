const userMoodModel = require("../models/userMoodModel");
const helper = require("../utils/helpers");

const getUsermood = (req, res) => {
  const userId = req.query.userId;
  const userMood = userMoodModel.getUserMoods(userId);
  res.status(200).json(userMood);
};

const addNewMood = (req, res) => {
  const { moodName, note } = req.body;
  const userId = req.query.userId;
  if (!moodName || !note || !userId) {
    res
      .status(400)
      .send("You need to provide info for all the required fields to add mood");
  } else {
    const newMood = userMoodModel.addNewMood(req.body, userId);
    res.status(201).json(newMood);
  }
};

const editMood = (req, res) => {
  const { moodName, note } = req.body;
  const userId = req.query.userId;
  if (!moodName || !note || !userId) {
    res.status(400).send("Edit mood you need to fill all");
  } else {
    const found = helper.findById(userMoodModel.getUserMoods(userId), req.params.id);
    if (found) {
      const updatedMood = userMoodModel.updateMoodById(userId, req.params.id, {
        ...req.body,
      });
      res.status(201).json({
        msg: `Mood has been Updated`,
        mood: updatedMood,
      });
    } else {
      res.status(404).json({
        errorMessage: `Mood ${req.params.moodName} with ID: ${req.params.id} not found`,
      });
    }
  }
};

module.exports = {
  getUsermood,
  addNewMood,
  editMood,
};
