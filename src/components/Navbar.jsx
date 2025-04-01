import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { useContext } from 'react'
import { UserContext } from '../context/AuthContext'

const Navbar = () => {
    const {user, logOut} = useContext(UserContext);
    const [menu, setMenu] = useState(false);

    const handleMenu = () => {
        setMenu(!menu)
    }

    const navigate = useNavigate();

    const handleSignOut = async() => {
        try {
          await logOut();
          navigate('/')
        } 
        catch (error) {
          console.log(error.message)
        }
    }

  return (
    <div className='rounded-div flex items-center justify-between h-20 font-bold'>
        <Link to='/'>
            <h1 className='text-2xl'>CryptoSphere</h1>
        </Link>
        <div className='hidden md:block'>
            <ThemeToggle/>
        </div>
        
        {
            user?.email ? (
                <div className="flex items-center gap-4">
                    <Link 
                        to="/account" 
                        className="p-3 hover:text-accent transition duration-300"
                    >
                        Account
                    </Link>
                    <button 
                        onClick={handleSignOut} 
                        className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <div className="hidden md:flex items-center gap-4">
                    <Link 
                        to="/signin" 
                        className="p-3 hover:text-accent transition duration-300"
                    >
                        Sign In
                    </Link>
                    <Link 
                        to="/signup" 
                        className="bg-button text-btnText px-5 py-2 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
                    >
                        Sign Up
                    </Link>
                </div>
            )
        }


        {/* mobile section */}
        <div onClick={handleMenu} className='block md:hidden cursor-pointer z-10'>
            {
                menu                     
                ? <AiOutlineClose size={22}/>
                : <AiOutlineMenu size={22}/>
            }
        </div>
        <div className=
            {
                menu 
                ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10'
                : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300'
            }>
            <ul className='w-full p-4'>
                <li onClick={()=>setMenu(false)} className='border-b py-6'>
                    <Link to='/'>Home</Link>
                </li>
                <li onClick={()=>setMenu(false)} className='border-b py-6'>
                    <Link to='/'>Account</Link>
                </li>
                <li className='py-6'>
                    <ThemeToggle />
                </li>
            </ul>
            <div className='flex flex-col w-full p-4'>
                <Link to='/signin'>
                    <button onClick={()=>setMenu(false)} className='w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl'>Sign In</button>
                </Link>
                <Link to='/signup'>
                    <button onClick={()=>setMenu(false)} className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>Sign Up</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar