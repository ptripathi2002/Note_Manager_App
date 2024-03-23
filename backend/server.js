const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const app = express();
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");
const Task = require("./model/taskModel");

//MiddleWare----It is a function which has access to req,res property of the function.

app.use(express.json()); //It is a middleware that comes with Express

app.use(express.urlencoded({ extended: false })); //To Provide the data in the form of Forms i.e., Name  Values

// const logger = (req, res, next) => {
//   console.log("MiddleWare is Running");
//   console.log(req.method);
//   next();
// };

//-------------------------------------------------------------------------

//Linking taskRoutes
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://taskmanager-frontend.onrender.com",
    ],
  })
);

app.use("/api/tasks", taskRoutes);

//--------------------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("This is Home Page");
});

// const PORT = process.env.PORT || 5000;
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, () => {

//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => console.log(err));

//Create a Task

app.post("/api/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ ERROR: error.message });
  }
});

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, (req, res) => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
