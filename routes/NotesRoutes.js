import e from "express";

const router = e.Router() ;

import NotesController from "../controllers/NotesController.js" ;
import AuthMiddleware from "../Middleware/AuthMiddleware.js";

router.post("/addNote" , AuthMiddleware , NotesController.addNote ) ;
router.post("/getNotes" , AuthMiddleware , NotesController.getNotes ) ;
router.put("/:id" , AuthMiddleware , NotesController.updateNote ) ;
router.delete("/:id" , AuthMiddleware, NotesController.deleteNote ) ;
router.get("/:id" , AuthMiddleware, NotesController.getNoteById ) ;

export default router ;