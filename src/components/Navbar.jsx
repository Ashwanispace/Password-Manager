import React from 'react';

const Navbar = () => {
  return (
      <nav className='bg-slate-800 text-white'>
        <div className="flex justify-between items-center h-full py-1 md:py-5 md:justify-around md:px-20 mx-auto w-[95vw] md:w-full">

        <div className="logo font-bold text-lg md:text-2xl">
            <span className="text-green-500">&lt;</span>
              Pass
            <span className="text-green-500">Me/&gt;</span>
        </div>
        
         <ul>
            <li className='flex gap-2 md:gap-4'>
                <a className='hover:font-bold' href="#">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
            </li>
         </ul>
        </div>
      </nav>
  )
}

export default Navbar
