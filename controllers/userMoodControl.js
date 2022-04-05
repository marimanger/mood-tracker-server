const userMoodModel = require("../models/userMoodModel");

const getUserMoods = async (req, res) => {
  const userId = req.query.userId;
  if (req.query.date) {

    const date = req.query.date;
    console.info(`Searching mood by date ${date}`)
    try {
      const userMood = await userMoodModel.getUserMoodByDate(
        userId,
        date
      );
      if (!userMood) {
        res.status(404).send("Not found");
      }
      res.status(200).json(userMood);
    } catch {
      (error) => {
        res
          .status(500)
          .send(`Error processing user request, error ${error.message}`);
      };
    }
  } else {
    try {
      const userMoods = await userMoodModel.getUserMoods(userId);
      res.status(200).json(userMoods);
    } catch (error) {
      res.status(500).send("Error processing user request");
    }
  }
};

const addNewMood = async (req, res) => {
  const { moodName, note, date } = req.body;
  console.info('Creating new mood')
  const userId = req.query.userId;
  if (!moodName || !note || !userId || !date) {
    res
      .status(400)
      .send("You need to provide info for all the required fields to add mood");
  } else {
    try {
      console.info('Creating new mood')
      const newMood = await userMoodModel.addUserMood(req.body, userId);
      res.status(201).json(newMood);
    } catch {
      (error) => {
        res
          .status(500)
          .send(`Error processing user request, error ${error.message}`);
      };
    }
  }
};

const editMood = async (req, res) => {
  const { moodName, note } = req.body;
  const userId = req.query.userId;
  if (!moodName || !note || !userId) {
    res.status(400).send("Edit mood you need to fill all");
  } else {
    try {
      console.info(`userId ${userId}, body ${req.body}, paramId ${req.params.id}`);
      const found = await userMoodModel.getUserMoodById(req.params.id, userId);
      console.info(found);
      if (found) {
        userMoodModel.updateUserMoodById(userId, req.params.id, {
          ...req.body,
        });
        res.status(201).json({
          msg: `Mood has been Updated`,
        });
      } else {
        res.status(404).json({
          errorMessage: `Mood ${req.params.moodName} with ID: ${req.params.id} not found`,
        });
      }
    } catch {
      (error) => {
        console.error(`Error updating user mood ${error.message}`);
      };
    }
  }
};

module.exports = {
  getUserMoods,
  addNewMood,
  editMood,
};
