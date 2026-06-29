import zod from "zod";

const NotesValdtion = zod.object({
     // title, content, category, tags, status, isPinned, userId, color
    title: zod.string().min(1, "Title is required"),
    content: zod.string().min(1, "Content is required"),
    category: zod.string().min(1, "Category is required"),
    tags: zod.array(zod.string()).optional(),
    status: zod.enum(["active", "archived", "deleted"]).optional(),
    isPinned: zod.boolean().optional(),
    color: zod.string().optional(),
});

export default NotesValdtion;