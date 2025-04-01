import React, { useContext, useState } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';

const Signin = () => {
  const { signIn } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      await signIn(email,password);
      navigate('/account')
    }
    catch(err){
      console.log(err.message)
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className='flex items-center justify-center h-[90vh] bg-gray-50 dark:bg-gray-900 px-4'>
      <div className='w-full max-w-[400px] min-h-[450px] bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg'>
        <h1 className='text-3xl font-bold text-center text-gray-800 dark:text-white'>Sign In</h1>
        <form className='mt-6' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-600 dark:text-gray-300 font-medium'>Email</label>
            <div className='relative mt-2'>
              <input 
                className='w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white' 
                type='email' 
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <AiOutlineMail className='absolute left-3 top-4 text-gray-400 dark:text-gray-300 text-lg' />
            </div>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-600 dark:text-gray-300 font-medium'>Password</label>
            <div className='relative mt-2'>
              <input 
                className='w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white' 
                type='password' 
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <AiFillLock className='absolute left-3 top-4 text-gray-400 dark:text-gray-300 text-lg' />
            </div>
          </div>
          <button className='w-full mt-4 p-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition dark:bg-indigo-500 dark:hover:bg-indigo-600'>
            Sign In
          </button>
        </form>
        <p className='text-center text-gray-600 dark:text-gray-300 mt-4'>
          Don't have an account? <Link className='text-indigo-600 dark:text-indigo-400 font-medium hover:underline' to='/signup'>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;