import Note from "../models/note.js";
import NotesValdtion from "../validation/NotesValdtion.js";

class NotesController{
    async getNotes(req , res , next){
        try{
            const userId = req.userId;
            const notes = await Note.find({ userId });
            return res.status(200).json({ message: "Notes fetched successfully", notes });
        }catch (error) {
            next(error)
        }
    }

    async addNote(req , res , next){
        try{
             // title, content, category, tags, status, isPinned, userId, color
             const data = NotesValdtion.safeParse(req.body);
            if (!data.success) {
               return res.status(400).json({
                    message: "Validation failed",
                    errors: data.error.flatten().fieldErrors,
                });
            }
            const { title, content, category, tags, status, isPinned, color } = data.data;
            const userId = req.userId;
            const newNote = new Note({ title, content, category, tags, status, isPinned, userId, color });
            const savedNote = await newNote.save();
            return res.status(200).json({ message: "Note added successfully", note: savedNote });
        }catch (error) {
            next(error)
        }
    }

    async updateNote(req , res , next){
        try{
            const {id} = req.params;
            const {  title, content, category, tags, status, isPinned, color } = req.body;
            const userId = req.userId;
            const updatedNote = await Note.findOneAndUpdate(
                { _id: id, userId },
                { title, content, category, tags, status, isPinned, color },
                { new: true }
            );
            if (!updatedNote) {
                return res.status(402).json({ message: "Note not found" });
            }
            return res.status(200).json({ message: "Note updated successfully", note: updatedNote });
        }catch (error) {
            next(error)
        }
    }

    async deleteNote(req , res , next){
        try{
            const { id } = req.params;
            const userId = req.userId;
            
            const deletedNote = await Note.findOneAndDelete({ _id: id, userId });
            if(deletedNote.userId.toString() !== userId)   {
                return res.status(403).json({ message: "You are not authorized to delete this note" });
            }
            if (!deletedNote) {
                return res.status(404).json({ message: "Note not found" });
            }
            return res.status(200).json({ message: "Note deleted successfully" });
        }catch (error) {
            next(error)
        }
    }

    async getNoteById(req , res , next){
        try{
            const { id } = req.params;
            const userId = req.userId;
            const note = await Note.findOne({ _id: id, userId });
            if (!note) {
                return res.status(402).json({ message: "Note not found" });
            }
            return res.status(200).json({ message: "Note fetched successfully", note });
        }catch (error) {
            next(error)
        }
    }
}

export default new NotesController() ;