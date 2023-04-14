import React from 'react'
import { Button, Navbar } from 'react-bootstrap';
import { User } from '../models/user'
import * as UserApi from '../network/user_api';

interface NavBarLoggedInViewProps{
    user: User,
    onLogoutSuccessful: () => void
}

export default function NavBarLoggedInView({user, onLogoutSuccessful} : NavBarLoggedInViewProps) {

    async function logout() {
        try {
            await UserApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

  return (
    <>
    <Navbar.Text>
        Sign in as {user.username}
    </Navbar.Text>
    <Button onClick={logout}>Log Out</Button>

    </>
  )
}
