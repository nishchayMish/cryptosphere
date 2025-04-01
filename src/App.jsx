import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext'; 
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Signin from './routes/Signin';
import Signup from './routes/Signup';
import Account from './routes/Account';
import CoinPage from './routes/CoinPage';
import Footer from './components/Footer';
import AuthContextProvider from './context/AuthContext';

const App = () => {
  const [coins, setCoins] = useState([]);

  const fetchCoins = async () => {   
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1');
      const data = await res.json();
      setCoins(data); 
    } 
    catch (err) {
      console.error('Error fetching coins:', err);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);  

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home coins={coins} />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/account' element={<Account />} />
          <Route path='/coin/:coinId' element={<CoinPage />} />
        </Routes>
        <Footer/>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
