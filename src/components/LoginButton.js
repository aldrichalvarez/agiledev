import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import '../App.sass';

const LoginButton = () => {
   const { loginWithRedirect, isAuthenticated } = useAuth0();
   return (
      !isAuthenticated && (
         <button class="button" onClick={() => loginWithRedirect()}>
         Login
         </button>
      )
   )
}

export default LoginButton
