import zod from "zod";
   // title , doIn , isDone , userId , timestamps ,  Priority , catgory ,status
export const taskSchema = zod.object({
  title: zod.string().min(3, "Title must be at least 3 characters long"),
    doIn: zod.string().refine((value) => !isNaN(Date.parse(value)), {
      message: "Invalid date format",
    }),
  isDone: zod.boolean().optional(),
    Priority: zod.enum(["low", "medium", "high", "urgent"]).optional(),
    catgory: zod.enum(["work", "personal", "shopping", "other"]).optional(),
    status: zod.enum(["todo", "in-progress", "review", "done"]).optional(),
    content : zod.string().optional(),

});


export default taskSchema ;