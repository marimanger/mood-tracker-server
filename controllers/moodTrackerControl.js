const moodTrackerModel = require("../models/moodTrackerModel");
const helper = require("../utils/helpers");

const getAllData = (_req, res) => {
  const mood = moodTrackerModel.getAllData();
  res.status(200).json(mood);
};



module.exports = {
  getAllData

};
