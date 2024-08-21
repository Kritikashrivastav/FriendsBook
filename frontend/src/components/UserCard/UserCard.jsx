import React from 'react'
import './usercard.css';
import EditModal from '../EditModal/EditModal';
import { BASE_URL } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiDeleteBinLine } from "react-icons/ri";

const UserCard = ({ user, setUsers }) => {

  const handleDeleteUser = async () => {
   try{
      const res = await fetch(BASE_URL + "/friends/" + user.id, {
        method: "DELETE",
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error) 
      }
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id))
      toast.success("Friend Deleted Successfully!", {position: 'top-center',
        autoClose: 2000}
      )
   }catch(error){
      toast.error(`An Error Occurred : ${error.message}`,{autoClose:2000})
   }
  }

  return (
    <div className="card">
    <div className="card-header">
      <div className="header-content">
        <div className="user-info">
          <img src={user.imgUrl} alt={user.name} className="avatar" />
          <div>
            <h2 className="user-name">{user.name}</h2>
            <p className="user-role">{user.role}</p>
          </div>
        </div>
        <div className="actions">
          < EditModal user={user}
          setUsers={setUsers}/>  
          <RiDeleteBinLine
            className="delete-button"
            aria-label="Delete"
            onClick={handleDeleteUser}
          />
          
          
        </div>
      </div>
    </div>
    <div className="card-body">
      <p>{user.description}</p>
    </div>
  </div>
  )
}

export default UserCard