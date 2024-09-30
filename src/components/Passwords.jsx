import React from 'react'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const Passwords = ({passwordArray, setpasswordArray, setform }) => {

    const deleteDetails = async (id) => {
        
        try {
            let response = await axios.delete(`http://localhost:8000/api/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true // Include this if you need to send cookies
            });
    
            // Check if the response indicates success
            if (response.status === 201) { // Usually, a successful DELETE returns a 201 No Content status
                let updatedArray = passwordArray.filter((item) => item.id !== id);
                setpasswordArray(updatedArray);
            } else {
                console.error("Error deleting password:", response.data);
            }
        } catch (error) {
            console.error("Error deleting password:", error);
        }
    };
    

    const editDetails = async (id) => {
        
        let item = passwordArray.filter((item) => item.id == id)[0]
        setform(item);
        await deleteDetails(id);

    } 

    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    }


    return (
        <div >
            <div className=" mx-1 pb-2 md:py-16 md:px-28 md:pt-0 passwords">

                {passwordArray.length > 0 && <div className='font-bold text-lg py-4 md:text-2xl text-center'>Your Passwords</div>}



                {passwordArray.length === 0 && <div className='text-center'>No Passwords to display</div>}

                {passwordArray.length !== 0 &&
                    <div className='mx-2'>
                        <table className="table w-full overflow-hidden rounded-2xl">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='md:py-2'>Site</th>
                                    <th className='md:py-2'>Username</th>
                                    <th className='md:py-2'>Password</th>
                                    <th className='md:py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                { passwordArray.length > 0 && passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='p-1 md:p-2 border border-white'>

                                                <div className="flex justify-center items-center gap-2">
                                                    <a href={item.site} target='_blank' className="w-20 md:w-64 break-words text-center">{item.site}</a>
                                                    <div onClick={() => copyText(item.site)} className='size-4 cursor-pointer'><img src="/icons/copy.png" alt="" /></div>
                                                </div>

                                            </td>
                                            <td className='p-1 md:p-2 border border-white'>
                                                <div className="flex justify-center items-center gap-2">
                                                    <div className="w-16 md:w-40 break-words text-center">{item.username}</div>
                                                    <div onClick={() => copyText(item.username)} className='size-4 cursor-pointer'><img src="/icons/copy.png" alt="" /></div>
                                                </div>
                                            </td>
                                            <td className='p-1 md:p-2 border border-white'>
                                                <div className="flex justify-center items-center gap-2">
                                                    <div className="w-16 md:w-40 break-words text-center">{item.password}</div>
                                                    <div onClick={() => copyText(item.password)} className='size-4 cursor-pointer'><img src="/icons/copy.png" alt="" /></div>
                                                </div>
                                            </td>
                                            <td className='p-1 md:p-2 border border-white text-center'>
                                                <span onClick={() => editDetails(item.id)} className="cursor-pointer mx-1">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/oqaajvyl.json"
                                                        trigger="hover"
                                                        stroke="bold"
                                                        colors="primary:#4be1ec,secondary:#0a5c15"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                                <span onClick={() => deleteDetails(item.id)} className="cursor-pointer mx-1">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/vlnvqvew.json"
                                                        trigger="hover"
                                                        stroke="bold"
                                                        colors="primary:#4be1ec,secondary:#0a5c15"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                                }

                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}

export default Passwords
