import React, { useState } from 'react';
import './editmodal.css'; 

import { BASE_URL } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiEdit } from "react-icons/ci";

const EditModal = ({ user, setUsers }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [inputs, setInputs] = useState({
        name: user.name,
        role: user.role,
        description: user.description,
       
    });

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleEditModal = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try{
            const res = await fetch(`${BASE_URL}/friends/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json", 
                },
                body: JSON.stringify(inputs)
            }
            )
            const data = await res.json()
            if(!res.ok){
                throw new Error(data.error)
            }
            setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? data:u)))
            toast.success("Updated", {position:'top-center', autoclose: 2000})

        }catch(error){
            toast.error(`An Error Occurred : ${error.message}`,{autoClose:2000});
         } finally {
            setIsLoading(false);
        }
    
        // Here you can add your logic to send this data to your server

        // Close the modal after submission
        toggleModal();

        // Clear inputs
       
    };

    return (
        <>
            < CiEdit className='plus-btn' onClick={toggleModal} />
              
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleModal}>&times;</span>
                        <h2>My new BFF 😍</h2>
                        <form onSubmit={handleEditModal}>
                            <label htmlFor="name">Full Name:</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="John Doe"
                                value={inputs.name}
                                onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))}
                                required
                            /><br /><br />

                            <label htmlFor="role">Role:</label>
                            <input
                                type="text"
                                id="role"
                                placeholder="Software Engineer"
                                value={inputs.role}
                                onChange={(e) => setInputs((prev) => ({ ...prev, role: e.target.value }))}
                                required
                            /><br /><br />

                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                placeholder="He's a software engineer who loves to code and build things."
                                rows="3"
                                value={inputs.description}
                                onChange={(e) => setInputs((prev) => ({ ...prev, description: e.target.value }))}
                                required
                            ></textarea><br /><br />

                            <button className="update" type="submit" isLoading={isLoading}>Update</button>
                            <button type="button" className="cancel" onClick={toggleModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditModal;
