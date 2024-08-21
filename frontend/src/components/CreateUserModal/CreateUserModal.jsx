import React, { useState } from 'react';
import './createusermodal.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../App';
import { FaUserEdit } from "react-icons/fa";

const CreateUserModal = ({ setUsers }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [inputs, setInputs] = useState({
        name: '',
        role: '',
        description: '',
        gender: '',
    });

   
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();

        if (!inputs.gender) {
            toast.error(`Gender error: ${error.message}`, { autoClose: 4000 });
            return;
        }
        setIsLoading(true)
        try{
            const res = await fetch(BASE_URL + "/friends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs)
            });

            const data = await res.json()
         
            if(!res.ok) {
                throw new Error(data.error)
            }

            toast.success("Yayy! 🎉 Friend created successfully.", { position: "top-center", autoClose: 2000 });

            setUsers((prevUsers) => [...prevUsers, data])

        }catch (error){
            toast.error(`An error occurred: ${error.message}`, { autoClose: 4000 });

        } finally {
            setIsLoading(false)
            setInputs({
                name: '',
                role: '',
                description: '',
                gender: ''

            })
        }
        toggleModal();        
    };

    return (
        <>
          
            <FaUserEdit  onClick={toggleModal} id='icon'/>
            

            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleModal}>&times;</span>
                        <h2>My new BFF 😍</h2>
                        <form onSubmit={handleCreateUser}>
                            <label htmlFor="name">Full Name:</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="John Doe"
                                value={inputs.name}
                                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                required
                            /><br /><br />

                            <label htmlFor="role">Role:</label>
                            <input
                                type="text"
                                id="role"
                                placeholder="Software Engineer"
                                value={inputs.role}
                                onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
                                required
                            /><br /><br />

                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                placeholder="He's a software engineer who loves to code and build things."
                                rows="3"
                                value={inputs.description}
                                onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                                required
                            ></textarea><br /><br />

                            <label>Gender:</label><br />
                                <label>
                                    <input
                                        type="radio"
                                        // name="gender"
                                        value="female"
                                        checked={inputs.gender === "female"}
                                        onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                                        required
                                    />
                                    Female
                                </label>
                                <br /><br />

                            <label>
                                <input
                                    type="radio"
                                    // name="gender"
                                    value="male"
                                    checked={inputs.gender === "male"}
                                    onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                                    required
                                />
                                Male
                            </label>
                            <br />


                            <button className="add" type="submit" disabled={isLoading}>
                                {isLoading ? 'Adding...' : 'Add'}
                            </button>
                            <button type="button" className="cancel" onClick={toggleModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    );
};

export default CreateUserModal;
