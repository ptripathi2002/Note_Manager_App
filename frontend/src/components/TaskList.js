import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Task from "./Task";
import TaskForm from "./TaskForm";
import axios from "axios";
import loadingImg from "../assets/loader.gif";
import { URL } from "../App";
import DOMPurify from "dompurify";
import { saveAs } from "file-saver";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTask, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  const { name } = formData;

  const handleQuillChange = (value) => {
    const sanitizedValue = DOMPurify.sanitize(value);
    setFormData({ ...formData, name: sanitizedValue });
  };

  const getTasks = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(URL + "api/tasks/");
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      return toast.error("Please enter a task.");
    }

    try {
      await axios.post(URL + `api/tasks/`, formData);
      toast.success("Task added successfully.");
      setFormData({ ...formData, name: "" });
      getTasks();
      handleDownloadHTML(); // Automatically download HTML for the latest task
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTasks = async (id) => {
    try {
      await axios.delete(`${URL}api/tasks/${id}`);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      return toast.error("Please add a task.");
    }
    try {
      await axios.put(`${URL}api/tasks/${taskId}`, formData);
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getTasks();
      return toast.success("Updated successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false });
    setTaskId(task._id);
    setIsEditing(true);
  };

  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true,
    };

    try {
      await axios.put(`${URL}api/tasks/${task._id}`, newFormData);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const cTask = tasks.filter((task) => task.completed === true);
    setCompletedTasks(cTask);
  }, [tasks]);

  // Function to handle download HTML
  const handleDownloadHTML = () => {
    const htmlContent = formData.name;
    const blob = new Blob([htmlContent], { type: "text/html" });
    saveAs(blob, "latest_task.html");
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleQuillChange={handleQuillChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks:</b> {tasks.length}
        </p>
        <p>
          <b>Completed Tasks:</b> {completedTask.length}
        </p>
      </div>
      <hr />
      {isLoading ? (
        <div className="--flex-center">
          <img src={loadingImg} alt="Loading" />
        </div>
      ) : tasks.length === 0 ? (
        <p className="--py">No task added. Please add a task</p>
      ) : (
        <>
          {tasks.map((task, index) => (
            <Task
              key={task._id}
              task={task}
              index={index}
              deleteTask={deleteTasks}
              getSingleTask={getSingleTask}
              setToComplete={setToComplete}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default TaskList;
