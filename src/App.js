import React from 'react';
import './App.sass';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>

  return (
    <>
    <LoginButton/>
    <LogoutButton/>
    <Profile/>
    </>
  );
}

export default App;
