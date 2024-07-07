const express = require("express");
const router = express.Router();
const taskControllers = require("../Controllers/task.controller");
const authenticateToken = require("../utilities");


// route for add new task
router.route('/add-task')
      .post(authenticateToken, taskControllers.addTask);

// route for edit exist task
router.route('/edit-task/:taskId')
      .put(authenticateToken, taskControllers.editTask);

// route for update is isComplete value
router.route('/update-isComplete-task/:taskId')
      .put(authenticateToken, taskControllers.updateIsComplete);

// route for show all tasks created by user
router.route('/')
      .get(authenticateToken, taskControllers.displayTasks);

// delet specific task
router.route('/delete-task/:taskId')
      .delete(authenticateToken, taskControllers.deleteTask);

// search in tasks
router.route('/search-task')
      .get(authenticateToken, taskControllers.searchTasks);
module.exports = router;