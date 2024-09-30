// src/components/Dashboard.jsx
import axios from 'axios';
import React,{useContext,useEffect,useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';
import Manager from './Manager';



const Dashboard = () => {
    const {user,logout} = useContext(AuthContext);
    const [passwordArray, setpasswordArray] = useState([]) 
    useEffect(()=>{
        const fetchPasswords = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/read', {
                    headers: {
                        'Content-Type':'application/json',
                      },
                    withCredentials: true
                });
                setpasswordArray(response.data);
            } catch (error) {
                console.log("Error fetching passwords:", error);
            }
        };
    
        fetchPasswords();
    },[]);
   
    return (
        <>
            
          <Navbar />
          <div className='flex justify-evenly items-center m-3'>
            <div className='flex items-center'>
                <span className='md:text-lg md:font-bold '>Welcome,</span>
                <div className='md:text-2xl text-green-700 font-bold flex'>
                    <img className='h-4 w-4 md:h-6 md:w-6 relative top-1 left-1'src="icons/user-account.png" alt="account" />
                    <span className='ml-1'>{user}</span>
                </div>
                </div>
            <div>
                <button className='bg-red-500 text-white border-2 rounded-full md:font-bold md:p-2 p-1 border-red-900 hover:text-black' onClick={logout}>Logout</button>
            </div>
          </div>
          <Manager passwordArray={ passwordArray } setpasswordArray={ setpasswordArray }/>
        </>
      );
};

export default Dashboard;
