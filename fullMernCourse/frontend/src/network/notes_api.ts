import { Note } from "../models/note";
import { fetchData } from "../utils/fetchData";

export async function fetchNotes(): Promise<Note[]>{
    const response = await fetchData("/api/notes", {method: "GET"});
    return response.json();
};

export interface NoteInput{
    title: string;
    text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
    const response = await fetchData("/api/notes", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(note)
    });
    return response.json();
};

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const response = await fetchData(`/api/notes/${noteId}`, {
        method: "PATCH", 
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(note),
        credentials: "include"
    });
    return response.json();
}

export async function deleteNote(noteId: string) {
    await fetchData(`/api/notes/${noteId}`, {method:"DELETE"})
};