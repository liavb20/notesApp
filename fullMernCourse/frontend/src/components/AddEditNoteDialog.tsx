import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Note } from '../models/note'
import { NoteInput } from '../network/notes_api'
import * as NotesApi from "../network/notes_api"
import TextInputField from './form/TextInputField'

interface AddEditNoteDialogProps{
    noteToEdit?: Note,
    onDismiss: () => void, 
    onNoteSaved: (note: Note) => void,
}

export default function AddEditNoteDialog({noteToEdit, onDismiss, onNoteSaved}: AddEditNoteDialogProps) {

    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<NoteInput>({
        defaultValues:{
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || "",
        }
    });

    async function onSubmit(input:NoteInput) {
        try {
            let noteResponse: Note;
            noteToEdit? noteResponse = await NotesApi.updateNote(noteToEdit._id, input) : 
            noteResponse =  await NotesApi.createNote(input,)
            onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

  return (
    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>
                {noteToEdit? "Edit Note": "Add Note"}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form id='addEditNoteForm' onSubmit={handleSubmit(onSubmit)}>

                <TextInputField 
                name="title"
                label='title'
                type="text"
                placeholder="Title"
                register={register}
                registerOptions={{required: "Required"}}
                error={errors.title}
                />

                <TextInputField 
                name="text"
                label='Text'
                as="textarea"
                placeholder="Text"
                register={register}
                rows={5}
                error={errors.title}
                />

            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button type='submit' form='addEditNoteForm' disabled={isSubmitting}>
                Save
            </Button>
        </Modal.Footer>
    </Modal>
  )
}
