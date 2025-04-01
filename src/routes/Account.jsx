import React from 'react';
import SavedCoins from '../components/SavedCoins';
import { UserContext } from '../context/AuthContext';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Account = () => {

  const { user, logOut } = useContext(UserContext);
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

  if(user){
    return (
      <div className='max-w-[1140px] mx-auto p-2 sm:p-0'>
        <div className='flex justify-between items-center my-12 py-8 px-6 bg-white dark:bg-gray-800 rounded-3xl shadow-xl'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Account</h1>
            <p className='text-gray-600 dark:text-gray-300 mt-2'>Welcome, {user?.email}</p>
          </div>
  
          <button onClick={handleSignOut} className='px-4 py-2 font-semibold text-xs sm:px-6 sm:py-2 sm:text-sm text-white bg-red-500 hover:bg-red-600 rounded-2xl shadow-lg hover:shadow-2xl transition whitespace-nowrap'>
            Sign Out
          </button>
  
        </div>
        <div className='my-12 py-8 px-6 bg-white dark:bg-gray-800 rounded-3xl shadow-xl'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white py-4'>Saved Coins</h1>
          <div className='w-full min-h-[300px] bg-gray-100 dark:bg-gray-700 rounded-xl p-6'>
            <SavedCoins />
          </div>
        </div>
      </div>
    );
  }
  else{
    return <Navigate to="/signin"/>
  }
  
};

export default Account;