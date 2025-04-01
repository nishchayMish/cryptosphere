import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useContext } from 'react';
import { UserContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logOut } = useContext(UserContext);
    const [menu, setMenu] = useState(false);

    const handleMenu = () => {
        setMenu(!menu);
    };

    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await logOut();
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="rounded-div flex items-center justify-between h-20 font-bold px-4">
            {/* Logo on the left */}
            <Link to="/" className="text-2xl">
                CryptoSphere
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
                <ThemeToggle />
                {user?.email ? (
                    <>
                        <Link to="/account" className="p-3 hover:text-accent transition duration-300">
                            Account
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/signin" className="p-3 hover:text-accent transition duration-300">
                            Sign In
                        </Link>
                        <Link to="/signup" className="bg-button text-btnText px-5 py-2 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu Icon (Right-Aligned) */}
            <div className="md:hidden cursor-pointer z-10" onClick={handleMenu}>
                {menu ? <AiOutlineClose size={22} /> : <AiOutlineMenu size={22} />}
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed md:hidden left-0 top-20 w-full h-[90%] bg-primary transition-transform duration-300 z-10 
                    ${menu ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <ul className="w-full p-4 text-center">
                    <li className="border-b py-6" onClick={() => setMenu(false)}>
                        <Link to="/">Home</Link>
                    </li>
                    {user?.email && (
                        <>
                            <li className="border-b py-6" onClick={() => setMenu(false)}>
                                <Link to="/account">Account</Link>
                            </li>
                            <li className="py-6">
                                <button
                                    onClick={() => {
                                        handleSignOut();
                                        setMenu(false);
                                    }}
                                    className="w-full p-3 bg-red-500 text-white rounded-2xl shadow-lg"
                                >
                                    Sign Out
                                </button>
                            </li>
                        </>
                    )}
                    <li className="py-6 flex items-center justify-center">
                        <ThemeToggle />
                    </li>
                </ul>

                {!user?.email && (
                    <div className="flex flex-col w-full p-4">
                        <Link to="/signin">
                            <button
                                onClick={() => setMenu(false)}
                                className="w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl"
                            >
                                Sign In
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button
                                onClick={() => setMenu(false)}
                                className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
                            >
                                Sign Up
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
