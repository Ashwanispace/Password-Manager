// src/components/Signup.jsx

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
    const { signup,Errors,setErrors } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function isAlphanumeric(str) {
        return /^[a-zA-Z0-9]+$/.test(str);
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password.length <= 4){
            setErrors("Password length must be greater than 4");
            return;
        }
        else if(username.length <= 4){
            setErrors("Username length must be greater than 4");
            return;
        }
        else if(!isAlphanumeric(username)){
            setErrors("Username should only contain digits and alphabets");
            return;
        }
        await signup(username, password);
    };

    return (
        <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="icons/favlogo.png" alt="PassMe"/>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create Your Account Now!!</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900" >Username</label>
                        <div className="mt-2">
                            <input id="username" name="username" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 sm:px-5" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900" >Password</label>
                            
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 sm:px-5" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    
                   <div className='h-[20px] text-center'>
                   { Errors && <div className='text-sm text-red-600 font-bold mt-5 mb-1'>{Errors}</div> }
                   </div> 
                    
                        <button type="submit" className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Signup</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a user?
                    <a href="/login" className="font-semibold leading-6 text-green-600 hover:text-green-500">Log in to Your Account here</a>
                </p>
            </div>
        </div>
        </>
    );
};

export default Signup;
