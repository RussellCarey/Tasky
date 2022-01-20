import express from "express";
const router = express.Router();

const TaskController = require("../controllers/taskController");
const AuthController = require("../controllers/authController");

router.post("/addNewTaskName", AuthController.checkLoggedIn, TaskController.addNewTaskName);
router.get("/getAllTaskNames", AuthController.checkLoggedIn, TaskController.getAllTaskNames);
router.post("/addNewTaskHours", AuthController.checkLoggedIn, TaskController.addNewTaskHours);
router.delete("/deleteTaskName", AuthController.checkLoggedIn, TaskController.deleteTaskName);
router.delete("/deleteTaskWithHours", AuthController.checkLoggedIn, TaskController.deleteTaskWithHours);

module.exports = router;
