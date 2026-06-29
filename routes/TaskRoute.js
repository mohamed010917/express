import express from "express";

import AuthMiddleware from "../Middleware/AuthMiddleware.js";
import TasksController from "../controllers/TasksController.js";



const router = express.Router();


router.get("/", AuthMiddleware, TasksController.getasks);
router.post("/", AuthMiddleware, TasksController.createTask);
router.put("/:id", AuthMiddleware, TasksController.updateTask);
router.delete("/:id", AuthMiddleware, TasksController.deleteTask);

export default router;