import React, { useEffect, useState } from "react";
import { Auth, Hub } from 'aws-amplify'
import { Authenticator, AmplifyTheme } from 'aws-amplify-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import MarketPage from './pages/MarketPage'
import Navbar from './components/Navbar'

import "./App.css";

function App() {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    getUserData();
    Hub.listen('auth', onHubCapsule)
  })

  const getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser()
    if(user) setUser(user)
    else setUser(null)
  }

  const onHubCapsule = capsule => {
    switch(capsule.payload.event) {
      case 'signIn':
        console.log('sign-in')
        getUserData()
        break;
      case 'signUp':
        console.log('signed-up')
        break;
      case 'signOut':
        console.log('signout')
        setUser(null)
        break;
      default:
        return;
    }
  }
  
  const handleSignOut = async () => {
    try {
      await Auth.signOut()
      setUser(null)
    } catch(error) {
      console.log('Signing out user -',error)
    }
  }
  
  return !user ? (
    <Authenticator theme={theme} /> 
  ) : (
    <Router>
      <>
        {/* Navigation Bar */}
        <Navbar user={user} signOut={handleSignOut}/>
      
        {/* Routes */}
        <div className="app-container">
          <Route exact path='/' component={HomePage}/>
          <Route path='/profile' component={ProfilePage}/>
          <Route path='/markets/:marketId' component={({ match }) => <MarketPage marketId={match.params.marketId} /> }/>
        </div>
      </>
    </Router>
  );
}

const theme = {
  ...AmplifyTheme,
  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: 'var(--lightAmazonOrange)'
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: 'var(--amazonOrange)'
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: '5px'
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: 'var(--squidInk)'
  }
}

export default App;
