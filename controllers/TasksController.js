
import Task from "../models/task.js";
import taskSchema from "../validation/TasksValdtion.js";


class TasksController {
     // title , doIn , isDone , userId , timestamps , status ,   Priority , catgory ,status
  async getasks(req, res) {
    try {
      const userId = req.userId;
      const tasks = await Task.find({ userId });
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async createTask(req, res) {
    try {
      const userId = req.userId;
      const data = taskSchema.safeParse(req.body);
      if(!data.success) {
        const errorMessages = data.error.issues.map(
          (err) => err.message
        );

        return res.status(400).json({
          success: false,
          errors: errorMessages,
        });
      }

      const { title, doIn, isDone,   Priority ,content, catgory ,status  } = data.data;
      const newTask = new Task({ title, doIn, isDone,content, catgory ,status , userId });
    const savedTask = await newTask.save();
    return res.status(200).json({ message: "Task created successfully", task: savedTask });
    }catch (error) {
      return res.status(402).json({ message: "Internal server error" });
    }
  }

  async updateTask(req, res) {
    try {
      const userId = req.userId;
      const taskId = req.params.id;
      const data = taskSchema.partial().safeParse(req.body);
      if(!data.success) {
        const errorMessages = data.error.issues.map(
          (err) => err.message
        );

        return res.status(400).json({
          success: false,
          errors: errorMessages,
        });
      }

      const updatedTask = await Task.findOneAndUpdate(
        { _id: taskId, userId },
        data.data,
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteTask(req, res) {
    try {
      const userId = req.userId;
      const taskId = req.params.id;

      const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });

      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }



}

export default new TasksController();