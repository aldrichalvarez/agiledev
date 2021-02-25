import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import '../App.sass';

const LogoutButton = () => {
   const { logout, isAuthenticated } = useAuth0();
   return (
      isAuthenticated && (

         

         <div style={{float: 'right'}}>
            <button class="button" onClick={() => logout()}>
         Logout
      </button>
         </div>
         
      )
      
   )
}

export default LogoutButton
