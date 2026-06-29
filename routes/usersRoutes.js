import express from "express";
import UsersController from "../controllers/userController.js";
import upload from "../Middleware/upload.js";
import AuthMiddleware from "../Middleware/AuthMiddleware.js";
const router = express.Router();

router.get("/", UsersController.Me ) ;
router.post("/register", upload.single("image"),UsersController.registerUser ) ;
router.post("/login", UsersController.loginUser ) ;
router.get("/me", UsersController.Me ) ;
router.put("/users/change-password" ,AuthMiddleware, UsersController.ChangPassword) ;
router.post("/users/upload-image",AuthMiddleware, upload.single("image"), UsersController.uploadImage) ;
router.put("/users/profile",AuthMiddleware, UsersController.updateProfile) ;
router.get("/users/statistics",AuthMiddleware, UsersController.UserStatistics) ;
export default router;