import React, { useEffect,useContext } from 'react'
import Passwords from './passwords';
import { AuthContext } from '../context/AuthContext';
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = ({ passwordArray,setpasswordArray }) => {

    const ref = useRef(null);
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    

    

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const showPassword = () => {
        if (ref.current.src.includes("hide.png")) {
            passwordRef.current.type = "text";
            ref.current.src = "icons/eye.png";
        } else {
            ref.current.src = "icons/hide.png";
            passwordRef.current.type = "password";
        }
    };

    const savePassword = async () => {
        try {
            let updated_data = { ...form, id: uuidv4() };
            
            const response = await axios.post('http://localhost:8000/api/create', updated_data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // This is equivalent to credentials: 'include'
            });
    
            if (response.status === 201) {
                
                   let updatedArray = [...passwordArray, updated_data];
                    setpasswordArray(updatedArray);
                
                setform({ site: "", username: "", password: "" });
            } else {
                console.error("Error creating password:", response.data);
            }
        } catch (error) {
            console.error("Error creating password:", error);
        }
    };
    








    return (


        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />


            <div className="absolute inset-0 -z-10 h-full w-full bg-green-200 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className=" py-6 md:mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-500">&lt;</span>
                    Pass
                    <span className="text-green-500">Me/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center md:font-bold'>Your own Password Manager</p>

                <div className="text-black flex flex-col p-4 gap-5 items-center md:p-8">
                    <input onChange={handleChange} placeholder="Enter the Website URL" className='rounded-full border border-green-500 text-black p-4 py-1 w-full' type="text" name="site" value={form.site} />

                    <div className="flex flex-col justify-between gap-5 w-full md:flex-row md:gap-8">

                        <input onChange={handleChange} placeholder="Enter the Username" className='rounded-full border border-green-500 text-black p-4 py-1 w-full' type="text" name="username" id="username" value={form.username} />

                        <div className="relative w-full">
                            <input ref={passwordRef} onChange={handleChange} placeholder="Enter the Password" className='rounded-full border border-green-500 text-black p-4 py-1 w-full' type="password" name="password" id="password" value={form.password} />
                            <span className="absolute right-1 top-1 cursor-pointer pr-2">
                                <img ref={ref} onClick={showPassword} width={26} src="icons/hide.png" alt="" />
                            </span>
                        </div>

                    </div>

                    <button onClick={savePassword} disabled={form.site.length < 5 || form.password.length < 5} className=' bg-green-500 rounded-full w-fit py-2 px-6 flex gap-2 justify-center items-center hover:bg-green-400 disabled:cursor-not-allowed'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save</button>


                </div>
            </div>


            <Passwords passwordArray={passwordArray} setpasswordArray={setpasswordArray} setform={setform} />




        </>
    )
}

export default Manager
