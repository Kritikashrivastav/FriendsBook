import React, { useState } from 'react'
import './navbar.css';
import PythonIcon from '../../assets/images/python.png'
import PlusIcon from '../../assets/images/plus.png'
import ReactIcon from '../../assets/images/react.png'
import EqualIcon from '../../assets/images/equal.png'
import BoomIcon from '../../assets/images/boom.png'
import BffIcon from '../../assets/images/bff.png'
import SunIcon from '../../assets/images/sun.png'
import MoonIcon from '../../assets/images/moon.png'
import CreateUserModal from '../CreateUserModal/CreateUserModal';


const Navbar = ({colormode, handleColorMode, setUsers}) => {

  return (
    <div className={`navbar ${colormode}` }>
        <div className='navbar-items'>

          {/* Left part */}
            <div className='left-items'>
                <a className='logo1' href='#'>
                  <img src={PythonIcon} alt='python logo'/>
                </a>

                <a className='logo2' href='#'>
                  <img src={PlusIcon} alt='plus logo'/>
                </a>

                <a className='logo1' href='#'>
                  <img src={ReactIcon} alt='react logo'/>
                </a>

                <a className='logo2' href='#'>
                  <img src={EqualIcon} alt='equal logo'/>
                </a>

                <a className='logo1' href='#'>
                  <img src={BoomIcon} alt='boom logo'/>
                </a>
            </div>


            {/* Middle part */}
            <div className='title'>
                 <h1>Tomodachi</h1> 
            </div>


            {/* Right part */}
            <div className='right-items'>

              <p>BFF+Ship</p>

              <img className='bff-icon' src={BffIcon} alt='bff logo'/>
            
              <button className='button-icons' onClick={handleColorMode}>
                {colormode === 'light' ?
                 <img src={SunIcon} alt='Switch to light mode'/>
                  :
                  <img src={MoonIcon} alt='Switch to dark mode'/>   
                  }
              </button>

              <CreateUserModal setUsers={setUsers}/>

            </div>
        </div>
    </div>
  )
}

export default Navbar