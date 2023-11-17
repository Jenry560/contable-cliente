import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import './normalize.css'
import './App.css'
import Rutas from './rutas'
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='519988429373-9sugtshvmp40v3l447ls6gqnsm5ihj9u.apps.googleusercontent.com'>
  <React.StrictMode>
   
    <Rutas/>
   
  </React.StrictMode>
  </GoogleOAuthProvider>,
)
