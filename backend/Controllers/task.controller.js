const Task = require("../Models/task.model");

// add new task
const addTask = async (req, res) => {

  // get data from request body and assign  to variable
  const { title, details } = req.body;
  const { user } = req.user;

  // handle the user entries
  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  try {
    // create object from Task model to add it
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

  // get data from request body and assign  to variable
  // need task id to identified the tasked to edite
  const taskId = req.params.taskId;
  const { title, details, isComplete } = req.body;
  const { user } = req.user;

  if (!title && !details) {
    return res
      .status(400)
      .json({ error: true, message: "There is no changes" });
  }

  try {
    // get task if it exist based on its id and user's id who created it
    const task = await Task.findOne({ _id: taskId }, { userId: user._id });

    // if no task matched with the id
    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    // assign new values to task field
    if (title) task.title = title;
    if (details) task.details = details;
    if (isComplete) task.isComplete = isComplete;

    await task.save();

    return res.json({ error: false, task, message: "Task Edited Successful" });

  } catch (error) {

    return res.status(500).json({
      error: true,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

// update is isComplete value
const updateIsComplete = async (req, res) => {

  // need task id to identified the tasked to update isComplete field
  const taskId = req.params.taskId;
  const { isComplete } = req.body;
  const { user } = req.user;

  try {
    const task = await Task.findOne({ _id: taskId }, { userId: user._id });

    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    // if the user not determain isComplete vlaue ,it will be false by default
    if (isComplete) task.isComplete = isComplete || false;

    await task.save();

    return res.json({ error: false, task, message: "Task update successful" });

  } catch (error) {

    return res.status(500).json({
      error: true,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

//show all tasks created by user
const displayTasks = async (req, res) => {

  const { user } = req.user;

  try {

    // get all tasks created bt user and sorted them reverse depend on isComplete value
    const tasks = await Task.find({ userId: user._id }).sort({ isComplete: -1 });

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
    // get the task will be deleted
    const task = await Task.findOne({ _id: taskId, userId: user._id });

    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    // delete task
    await Task.deleteOne({ _id: taskId, userId: user._id });

    return res.json({ error: false, message: "Task deleted successful" });

  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

// serace tasks
const searchTasks = async (req, res) => {

  // get the query that the user writed in query params tp search for specific data
  const { user } = req.user;
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      error: true,
      message: "Search query is required",
    });
  }

  try {
    // compare the qiery with the potinial results
    const matchingTasks = await Task.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { details: { $regex: new RegExp(query, "i") } },
      ],
    });

    return res.json({
      error: false,
      tasks: matchingTasks,
      message: "Successful to retrive matching tasks searched ",
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

module.exports = {
  addTask,
  editTask,
  updateIsComplete,
  displayTasks,
  deleteTask,
  searchTasks,
};
