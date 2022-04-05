const UserMood = require("./../models/userMoodsModel.model.js");

//get all users-mood
const getUserMoods = async (userId) => {
  return await findUserMoodsCommon({ userId: userId });
};

const getUserMoodByDate = async (userId, date) => {
  return await findUserMoodsCommon({
    $and: [{ userId: userId }, { date: date }],
  });
};

const getUserMoodById = async (id, userId) => {
  return await findUserMoodsCommon({ $and: [{ _id: id }, { userId: userId }] });
};

//add new mood
const addUserMood = async (newMoodData, userId) => {
  try {
    const newMood = new UserMood({
      moodName: newMoodData.moodName,
      note: newMoodData.note,
      date: newMoodData.date,
      userId: userId,
    });
    console.info(`New mood is ${newMood}`);
    return await UserMood.create(newMood);
  } catch {
    (error) => {
      console.info(error.message);
      throw new Error("Error adding user mood");
    };
  }
};

//edit mood
const updateUserMoodById = async (userId, moodId, updateValues) => {
  const userMoodItem = await getUserMoodById(moodId, userId);
  console.info(`Updating user modd for id ${moodId}, userId ${userId}, values ${JSON.stringify(updateValues)}`);
  if (userMoodItem) {
    try {
      await UserMood.updateOne(
        { $and: [{ id: moodId }, { userId: userId }] },
        { ...userMoodItem, ...updateValues }
      );
    } catch {
      (error) => {
        console.info(error.message);
        throw new Error("Error updaing user mood");
      };
    }
  }
};

const findUserMoodsCommon = async (query) => {
  try {
    const res = await UserMood.find(query);
    return res.map((item) => {
      return {
        id: item._id,
        moodName: item.moodName,
        note: item.note,
        date: item.date,
        userId: item.userId,
      };
    });
  } catch {
    (error) => {
      console.info(error.message);
      throw new Error("Error searching for user mood");
    };
  }
};

module.exports = {
  getUserMoods,
  addUserMood,
  getUserMoodByDate,
  updateUserMoodById,
  getUserMoodById,
};
