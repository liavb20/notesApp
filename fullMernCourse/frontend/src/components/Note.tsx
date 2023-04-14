import React from 'react'
import { Card } from 'react-bootstrap'
import { Note as NoteModel } from '../models/note'
import styles from '../styles/Note.module.css'
import styleUtils from '../styles/utils.module.css'
import { formatDate } from '../utils/formatDate'
import { MdDelete } from "react-icons/md";

interface NoteProps{
    note: NoteModel,
    onNoteClicked: (note: NoteModel) => void,
    onDeleteNoteClicked:(note: NoteModel) => void,
    className?: string
}

export default function Note({note, onDeleteNoteClicked, className, onNoteClicked}: NoteProps) {
    
  const {createdAt, title, updatedAt, text} = note;

  let createdUpdatedText: string;
  updatedAt > createdAt ? createdUpdatedText = "Updated: " + formatDate(updatedAt) :
  createdUpdatedText = "Created: " + formatDate(createdAt); 

  return (
    <Card 
    className={`${styles.noteCard} ${className}`}
    onClick={() => onNoteClicked(note)}>
        <Card.Body className={styles.cardBody}>
            <Card.Title className={styleUtils.flexCenter}>
                {title}
                <MdDelete
                className='text-muted ms-auto'
                onClick={(e)=>{
                    onDeleteNoteClicked(note)
                    e.stopPropagation();
                }}
                />
            </Card.Title>
            <Card.Text className={styles.cardText}>
                {text}
            </Card.Text>
        </Card.Body>
        <Card.Footer className='text-muted'>
            {createdUpdatedText}
        </Card.Footer>
    </Card>
  )
}
