const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const helper = require("../utils/helpers");

//get all users-mood
const getUserMoods = (userId) => {
  const moodUserData = helper.readData("./data/mood-user.json");
  const newFilteredData = moodUserData.filter((i) => i.userId === userId);
  return newFilteredData;
};

//add new mood
const addNewMood = (newMoodData, userId) => {
  const newMood = {
    id: uuidv4(),
    ...newMoodData,
    userId,
  };

  const moodFileContent = helper.readData("./data/mood-user.json");
  moodFileContent.push(newMood);
  helper.writeData("./data/mood-user.json", moodFileContent);
  return newMood;
};

//edit mood

const updateMoodById = (userId, moodId, updateValues) => {
  const updatedMood = getUserMoods(userId).map((mood) =>
    mood.id === moodId ? { ...mood, ...updateValues } : mood
  );
  helper.writeData("./data/mood-user.json", updatedMood);
  return updatedMood;
};

module.exports = {
  getUserMoods,
  addNewMood,
  updateMoodById,
};
