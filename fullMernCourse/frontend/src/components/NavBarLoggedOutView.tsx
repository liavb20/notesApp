import React from 'react'
import { Button } from 'react-bootstrap'

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}


export default function NavBarLoggedOutView({onLoginClicked, onSignUpClicked}: NavBarLoggedOutViewProps) {
  return (
    <>
    <Button onClick={onSignUpClicked}>Sign Up</Button>
    <Button onClick={onLoginClicked}>Login</Button>
    </>
  )
}
