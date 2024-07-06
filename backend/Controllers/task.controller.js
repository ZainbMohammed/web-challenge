
const Task = require("../Models/task.model");



// add new task
const addTask =  async (req, res) => {
    const { title, details } = req.body;
    const { user } = req.user;
  
    if (!title) {
      return res.status(400).json({ error: true, message: "Title is required" });
    }
  
    if (!details) {
      return res.status(400).json({ error: true, message: "Title is required" });
    }
  
    try {
      const task = new Task({
        title,
        details,
        userId: user._id,
      });
  
      await task.save();
  
      return res.json({
        error: false,
        task,
        message: "task added successful",
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: `Internal server error ${error.message}`,
      });
    }
  };
  
  // edit exist task
  const editTask = async (req, res) => {
  
    const taskId = req.params.taskId;
    const { title, details, isPinned } = req.body;
    const { user } = req.user;
  
    if (!title && !details) {
      return res
        .status(400)
        .json({ error: true, message: "There is no changes" });
    }
  
    try {
  
      const task = await Task.findOne({ _id: taskId},{ userId: user._id });
  
      if (!task) {
        return res.status(404).json({ error: true, message: "Task not found" });
      }
      if (title) task.title = title;
      if (details) task.details = details;
      if (isPinned) task.isPinned = isPinned;
  
      await task.save();
  
      return res.json({ error: false, task, message: "Task Edited Successful" });
  
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: `Internal Server Error: ${error.message}`,
      });
    }
  };
  
  // update is isPinned value
const updateIsPinned = async (req, res) => {
  
    const taskId = req.params.taskId;
    const { isPinned } = req.body;
    const { user } = req.user;
  
    try {
  
      const task = await Task.findOne({ _id: taskId},{ userId: user._id });
  
      if (!task) {
        return res.status(404).json({ error: true, message: "Task not found" });
      }
   
      if (isPinned) task.isPinned = isPinned || false;
  
      await task.save();
  
      return res.json({ error: false, task, message: "Task update successful" });
  
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: `Internal Server Error: ${error.message}`,
      });
    }
  };
  
  //show all tasks created by loginned user
  const displayTasks = async (req, res) => {
    const { user } = req.user;
  
    try {
      const tasks = await Task.find({ userId: user._id }).sort({ isPinned: -1 });
  
      res.json({
        error: false,
        tasks,
        message: "All tasks retrieved successful",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" });
    }
  };
  
  // delet specific task
  const deleteTask = async (req, res) => {
    const taskId = req.params.taskId;
    const { user } = req.user;
  
    try {
      const task = await Task.findOne({ _id: taskId, userId: user._id });
  
      if (!task) {
        return res.status(404).json({ error: true, message: "Task not found" });
      }
  
      await Task.deleteOne({_id: taskId, userId: user._id});
  
      return res 
        .json({ error: false, message: 'Task deleted successful' });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" });
    }
  };

  module.exports = {
    addTask,
    editTask,
    updateIsPinned,
    displayTasks,
    deleteTask
}