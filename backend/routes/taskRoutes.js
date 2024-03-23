const express = require("express");
const Task = require("../model/taskModel");
const router = express.Router();
const {
  createTask,
  getTasks,
  getTask,
  DeleteTask,
  UpdateTask,
} = require("../controller/taskController");

router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTask).delete(DeleteTask).put(UpdateTask);
//Create a Task
// router.post("/api/tasks", createTask);

// //Get/Read Data
// router.get("/api/tasks", getTasks);

// //Get A Single Task
// router.get("/api/tasks/:id", getTask);

// //Delete a Task
// router.delete("/api/tasks/:id", DeleteTask);

// //Update a Task
// router.put("/api/tasks/:id", UpdateTask);

module.exports = router;
