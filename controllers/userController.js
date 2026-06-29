import  registerSchema  from "../validation/RejusterValdtio.js";
import bcrypt from "bcryptjs";
import user from "../models/user.js";
import jwt from "jsonwebtoken" ;
import LoginValidation from "../validation/LoginValdtion.js";
import User from "../models/user.js";
import Note from "../models/note.js";
import Task from "../models/task.js";



class userController {
    async registerUser(req, res , next) {
        try{
            const validationSchema = registerSchema.safeParse({...req.body ,   image: req.file?.filename});           
            if (!validationSchema.success) {
                const errorMessages = validationSchema.error.issues.map(
                    (err) => err.message
                );

                return res.status(400).json({
                    success: false,
                    errors: errorMessages,
                });
            }

            const { name, email, password , image} = validationSchema.data;
            const passwordHash = await bcrypt.hash(password, 10); 
            const NewUser = await new user({ name, email, "password" : passwordHash , image});

            const savedUser = await NewUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "100h" });

            return res.status(200).json({ message: "User registered successfully" , token , savedUser });

        }catch (error) {
            next(error)
        }
    }



    async loginUser(req, res , next) {
        try{
            const data = LoginValidation.safeParse(req.body);
            if (!data.success) {
                const errorMessages = data.error.issues.map(
                    (err) => err.message
                );

                return res.status(400).json({
                    success: false,
                    errors: errorMessages,
                });
            }

            const { email, password } = data.data;
            const existingUser = await user.findOne({ email });
            if (!existingUser) {
                return res.status(402).json({ message: "User not found" });
            }

            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid password" });
            }

            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "100h" });
            
            return res.status(200).json({ message: "Login successful", token , existingUser });
        }catch (error) {
            next(error)
        }
    }

    registerUserWithGit(req, res) {

    }

    RegisterUserWithGoogle(req, res) {

    }
    async Me(req, res) {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const use = await User.findById(decoded.id).select("-password");

        if (!use) {
        return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({date : use });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
    }

    async  ChangPassword(req , res ,next){
        try{
            const userId = req.userId ;
            const user = await User.findById(userId) ;
            const {currentPassword ,newPassword } = req.body ;
            if(!user) return res.status(400).json({message : "not found user"})
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            console.log(currentPassword , newPassword , user.password) ;
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid password" });
            }
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            const newUser = await User.updateOne({_id : userId} ,{password : hashedNewPassword}) ;
            
            return res.status(200).json({masseg : "password updated "}) ;
        }catch(error){
            next(error) ;
        }
    }

    async uploadImage(req, res , next){
        try{
            const userId = req.userId ;
            const user = await User.findById(userId) ;
            if(!user) return res.status(400).json({message : "not found user"})
            const image = "http://localhost:5000/uploads/" + req.file?.filename ;
            const newUser = await User.updateOne({_id : userId} ,{image}) ;
            const updatedUser = await User.findById(userId).select("-password");
            
            return res.status(200).json({masseg : "image updated " , user :updatedUser}) ;
        }catch(error){
            next(error) ;
        }
    }

    async updateProfile(req, res , next){
        try{
            const userId = req.userId ;
            const user = await User.findById(userId) ;
            if(!user) return res.status(400).json({message : "not found user"})
            const {name , email} = req.body ;
            const newUser = await User.updateOne({_id : userId} ,{name , email}) ;
            const updatedUser = await User.findById(userId).select("-password");
            
            return res.status(200).json({masseg : "profile updated " , user :updatedUser}) ;
        }catch(error){
            next(error) ;
        }
    }


    async UserStatistics(req, res , next){
        try{
            const userId = req.userId ;
            const user = await User.findById(userId) ;
            if(!user) return res.status(400).json({message : "not found user"})
            const notesCount = await Note.countDocuments({ userId: userId });
            const completedNotesCount = await Note.countDocuments({ userId: userId, completed: true });
            const pendingNotesCount = await Note.countDocuments({ userId: userId, completed: false });
            const tasksCount = await Task.countDocuments({ userId: userId });
            const completedTasksCount = await Task.countDocuments({ userId: userId, completed: true });
            const pendingTasksCount = await Task.countDocuments({ userId: userId, completed: false });
            
            return res.status(200).json({
                notesCount,
                completedNotesCount,
                pendingNotesCount,
                tasksCount,
                completedTasksCount,
                pendingTasksCount
            });
        }catch(error){
            next(error) ;
        }
    }
        
}

export default new userController();