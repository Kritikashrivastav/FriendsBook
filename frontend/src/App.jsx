import React, { useState } from 'react';
import Navbar from "./components/Navbar/Navbar";

import './App.css';
import UserGrid from './components/UserGrid/UserGrid';

export const BASE_URL = "http://127.0.0.1:5000/api";

function App() 
  {
    const [users, setUsers] = useState([])


    const [colormode, setColorMode] = useState("dark")
  
    const handleColorMode = () =>{
      setColorMode((prevMode) => prevMode === 'dark' ? 'light' : 'dark')
    }

    

  return (

    <div className={`app ${colormode}`}>
      <Navbar setUsers={setUsers} colormode={colormode} handleColorMode={handleColorMode}/>
      
      <UserGrid users={users} setUsers={setUsers}/>
    </div>
 

  )
}

export default App;
