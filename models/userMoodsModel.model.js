const mongoose = require("mongoose");

const UserMoodSchema = mongoose.Schema({
  moodName: String,
  note: String,
  date: String,
  userId: String,
});

module.exports = mongoose.model("UserMood", UserMoodSchema);
