import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import * as UserApi from './network/user_api';
import NotesPage from './pages/NotesPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPage from './pages/PrivacyPage';
import styles from './styles/App.module.css'

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UserApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLoggedInUser()
  }, [])


  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowSignupModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />

        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path='/'
              element={<NotesPage loggedInUser={loggedInUser}/>}
            />
            <Route
              path='/privacy' 
              element={<PrivacyPage/>}
            />
            <Route
              path='/*'
              element={<NotFoundPage/>}
            />
          </Routes>
        </Container>


        {showSignupModal && 
        <SignUpModal
        onDismiss={() => {setShowSignupModal(false)}}
        onSignUpSuccessful={(user) => {
          setLoggedInUser(user);
          setShowSignupModal(false);
        }}
        />
        }
        {
          showLoginModal &&
          <LoginModal
          onDismiss={() => {setShowLoginModal(false)}}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
          />
        }

      </div>

    </BrowserRouter>
  );
}

export default App;
