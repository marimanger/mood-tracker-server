// const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const helper = require("../utils/helpers");

const getAllData = () => {
  const moodData = helper.readData("./data/mood.json");
  return moodData;
};


module.exports = {
  getAllData

};
