import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import usersRoutes from "./routes/usersRoutes.js";
import ErrorHandlening from "./Middleware/ErrorHandlening.js";
import NotesRoutes from "./routes/NotesRoutes.js";
import tasksRoutes from "./routes/TaskRoute.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
connectDB() ;
app.use(express.json());


app.use("/api", usersRoutes ) ;
app.use("/api/notes", NotesRoutes ) ;
app.use("/api/tasks", tasksRoutes ) ;
app.use("/uploads", express.static("uploads"));



app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(ErrorHandlening) ;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
});