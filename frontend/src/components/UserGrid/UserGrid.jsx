import React, { useEffect, useState } from 'react'
import './usergrid.css';
import UserCard from '../UserCard/UserCard.jsx';
import { BASE_URL } from '../../App.jsx';

const UserGrid = ({users, setUsers, colormode}) => {
    const[isLoading, setIsLoading] = useState(true)
   useEffect(() => {
    const getUsers = async () => {
      try{
        const res = await fetch(BASE_URL + "/friends")
        const data = await res.json();

        if(!res.ok){
          throw new Error(data.error);
        }
        setUsers(data)
      } catch(error) {
        console.log(error)
      }finally {
        setIsLoading(false)
      }
    }
    getUsers();

  }, [setUsers])
  return (
    <>
     <div className={`grid-container ${colormode}`}>
      {users.map((user) => (
        <div key={user.id} className='user-card'>
          <UserCard user={user} setUsers={setUsers}/>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))} 
    </div>

    {isLoading && ( 
      <div className='spin-box'>
        <div className='spinner'></div>
      </div>
    )}
    {!isLoading && users.length === 0 && (
      <div className='no-frnd'>
          <p className='no-frnd-para'>
            <span className='no-frnd-text'>Poor You</span>
            No Friend Found.
          </p>
      </div>
    )}
    </>
  )
}

export default UserGrid