import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from '../models/note'
import { assertIsDefined } from "../util/assertIsDefined";

interface createNoteBody{
    title?: string,
    text?: string
}

interface UpdateNoteParam{
    noteId: string
}

interface UpdateNoteBody{
    title?: string,
    text?: string
}

export const getNotes: RequestHandler = async(req, res, next)=>{
    const authenticatedUserId = req.session.userId;
    try{
        assertIsDefined(authenticatedUserId);

        const notes = await NoteModel.find({userId: authenticatedUserId}).exec();
        res.status(200).json(notes); 
    }catch(error){
        next(error);
    }
};

export const getNote: RequestHandler = async(req, res, next) => {
    const noteId = req.params.noteId;
    const authenticatedUserId = req.session.userId;

    try{
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(noteId)) throw createHttpError(400, "invalid note id");

        const note = await NoteModel.findById(noteId).exec();
        
        if(!note) throw createHttpError(404, "Note Not Found");

        if(!note.userId.equals(authenticatedUserId)) throw createHttpError(401, 'You cannot access this not');
  
        res.status(200).json(note);
    }catch(error){
        next(error);
    }
};

export const createNotes: RequestHandler<unknown, unknown, createNoteBody, unknown> = async(req, res, next)=> {
    const title = req.body.title;
    const text = req.body.text;
    const authenticatedUserId = req.session.userId;

    try{
        assertIsDefined(authenticatedUserId);

        if(!title) throw createHttpError(400, "note must have title");
        const newNote = await NoteModel.create({
            title, text, userId: authenticatedUserId
        });
        res.status(201).json(newNote);
    }catch(error){
        next(error);
    }
}

export const updateNote: RequestHandler<UpdateNoteParam, unknown, UpdateNoteBody, unknown> = async(req, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
    
        if (!mongoose.isValidObjectId(noteId)) throw createHttpError(400, "invalid note id");

        if(!newTitle) throw createHttpError(400, "note must have title");

        const note = await NoteModel.findById(noteId).exec();
        
        if(!note) throw createHttpError(404, "Note Not Found");

        if(!note.userId.equals(authenticatedUserId)) throw createHttpError(401, 'You cannot access this not');

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);
    } catch (error) {
        next(error)
    }
};

export const deleteNote: RequestHandler = async(req, res,next) => {
    const noteId = req.params.noteId;
    const note = await NoteModel.findById(noteId).exec();
    const authenticatedUserId = req.session.userId;
        
    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(noteId)) throw createHttpError(400, "invalid note id");
        if(!note) throw createHttpError(404, "Note Not Found");
        if(!note.userId.equals(authenticatedUserId)) throw createHttpError(401, 'You cannot access this not');
         
        await note.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};