const Task = require("../model/taskModel");

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ ERROR: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ ERROR: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json(`No Data Found for the id ${id}`);
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ ERROR: error.message });
  }
};

const DeleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json(`No Data Found for the id ${id}`);
    }
    res.status(200).json(`Task Deleted`);
  } catch (error) {
    res.status(500).json({ ERROR: error.message });
  }
};

const UpdateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json(`No Data Found for the id ${id}`);
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ ERROR: error.message });
  }
};

module.exports = { createTask, getTasks, getTask, DeleteTask, UpdateTask };
