const express = require("express");
const cors = require("cors");

const moodRoutes = require("./routes/moodTrackerRoutes");
// const warehouseRoutes = require("./routes/warehouseRoutes");

const app = express();
const PORT = 8080 || 4040;

app.use(express.json());

app.use(cors());

// app.use(warehouseRoutes);
app.use(moodRoutes);

app.get("/", (_req, res) => {
  res.send("Welcome to the Mood Tracker Server");
});

app.listen(PORT, () => {
  console.log(`Mood Tracker Server listening at http://localhost:${PORT}`);
});
