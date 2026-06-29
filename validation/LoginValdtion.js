import zod from "zod";

const LoginValidation = zod.object({
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters long").max(1024, "Password must be at most 1024 characters long"),
});

export default LoginValidation;