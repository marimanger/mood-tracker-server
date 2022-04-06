const express = require("express");
const cors = require("cors");

const moodRoutes = require("./routes/moodTrackerRoutes");
const userMoodRoutes = require("./routes/userMoodRoutes");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//mongodb
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// const warehouseRoutes = require("./routes/warehouseRoutes");

const app = express();
const PORT = 8080 || 4040;

//password auth
const mongoUser = process.env.MONGO_USER || "test";
const mongoPassword = process.env.MONGO_PASSWORD || "password";

app.use(express.json());
app.use(cors());

// app.use(warehouseRoutes);
app.use(moodRoutes);
app.use(userMoodRoutes);

app.get("/", (_req, res) => {
  res.send("Welcome to the Mood Tracker Server");
});

app.listen(PORT, () => {
  console.log(`Mood Tracker Server listening at http://localhost:${PORT}`);
});

const connectionString = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.ewecp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
console.info(connectionString)

mongoose
  .connect(connectionString
    ,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });
