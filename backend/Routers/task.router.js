const express = require("express");
const router = express.Router();
const taskControllers = require("../Controllers/task.controller");
const authenticateToken = require("../utilities");


// add new task
router.route('/add-task')
      .post(authenticateToken, taskControllers.addTask);

// edit exist task
router.route('/edit-task/:taskId')
      .put(authenticateToken, taskControllers.editTask);

// update is isPinned value
router.route('/update-isPinned-task/:taskId')
      .put(authenticateToken, taskControllers.updateIsPinned);

//show all tasks created by loginned user
router.route('/')
      .get(authenticateToken, taskControllers.displayTasks);

// delet specific task
router.route('/delete-task/:taskId')
      .delete(authenticateToken, taskControllers.deleteTask);

// search in tasks
router.route('/search-task')
      .get(authenticateToken, taskControllers.searchTasks);
module.exports = router;