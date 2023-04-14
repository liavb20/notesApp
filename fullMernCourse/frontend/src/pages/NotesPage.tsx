import React from 'react'
import { Container } from 'react-bootstrap'
import NotesPageLoggedInView from '../components/NotesPageLoggedInView'
import NotesPageLoggedOutView from '../components/NotesPageLoggedOutView'
import { User } from '../models/user';
import styles from '../styles/NotesPage.module.css';

interface NotesPageProps{
    loggedInUser: User | null
}

export default function NotesPage({loggedInUser}: NotesPageProps) {
  return (
    
    <Container className={styles.NotesPage}>
    <>
    {loggedInUser?<NotesPageLoggedInView/> : <NotesPageLoggedOutView/>} 
    </>
  </Container>
  )
}
