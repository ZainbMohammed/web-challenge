require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString,{
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // serverSelectionTimeoutMS: 30000, 
});

const User = require("./Models/user.model.js");
const Task = require("./Models/task.model");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const jwt = require("jsonwebtoken");
const authenticateToken = require("./utilities");

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

// register new user
app.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName) {
      return res.status(400).json({ error: true, message: "Name is required" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ error: true, message: "Email is required" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ error: true, message: "Password is required" });
    }

    const isUserExist = await User.findOne({ email: email });

    if (isUserExist) {
      return res.json({ error: true, message: "User already exist" });
    }

    const user = new User({
      fullName,
      email,
      password,
    });
    // insert new user
    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_SECRET_KEY, {
      expiresIn: "30m",
    });
    return res.json({
      error: false,
      user,
      accessToken,
      message: "Registration Successful",
    });
  } catch (error) {
    return res.json({ error: true, message: error.message });
  }
});
//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.email == email && user.password == password) {
    const loginedUser = { user: user };
    const accessToken = jwt.sign(loginedUser, process.env.ACCESS_SECRET_KEY, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

// add new task
app.post("/add-task", authenticateToken, async (req, res) => {
  const { title, details } = req.body;
  const { user } = req.user;
console.log("user id ===>",user._id)
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
});

// edit exist task
app.put("/edit-task/:taskId", authenticateToken, async (req, res) => {

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
});

// for show all tasks for testing
app.get("/tasks", authenticateToken, async (req, res) => {
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
});

// delet specific task
app.delete("/delete-task/:taskId", authenticateToken, async (req, res) => {
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
});
app.listen(8000);

module.exports = app;
