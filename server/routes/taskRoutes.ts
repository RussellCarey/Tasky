import express from "express";
const router = express.Router();

const TaskController = require("../controllers/taskController");
const AuthController = require("../controllers/authController");

router.post("/addNewTaskName", AuthController.checkLoggedIn, TaskController.addNewTaskName);
router.get("/getAllTaskNames", AuthController.checkLoggedIn, TaskController.getAllTaskNames);
router.post("/addNewTaskHours", AuthController.checkLoggedIn, TaskController.addNewTaskHours);

module.exports = router;
