import zod from "zod";

// validation schema for user registration
const registerSchema = zod.object({
  name: zod.string().min(3, "Name must be at least 3 characters long").max(50, "Name must be at most 50 characters long"),
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters long").max(1024, "Password must be at most 1024 characters long"),
  image: zod.file().optional(),
});


export default registerSchema;