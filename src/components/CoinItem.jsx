import React, { useContext, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { toast } from "react-toastify";

const CoinItem = ({ coin }) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate(`/coin/${coin.id}`); 
  };

  const [savedCoin, setSavedCoin] = useState(false);
  const {user} = useContext(UserContext);

  const coinPath = doc(db, 'users', `${user?.email}`)
  const saveCoin = async() => {
    if(user?.email){
      setSavedCoin(true)
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol
        })
      })
    }
    else{
      alert('Sign in to save a coin')
    }
  }

  return (
    <tr  
      className={`h-[80px] border-b overflow-hidden cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
    >
      <td onClick={saveCoin} className="px-4">
        {savedCoin ? (
          <AiFillStar className="text-yellow-500 cursor-pointer" />
        ) : (
          <AiOutlineStar className="text-gray-400 hover:text-yellow-500 cursor-pointer transition" />
        )}
      </td>
      <td>{coin.market_cap_rank}</td>
      <td>
        <div onClick={handleClick} className='flex items-center'>
          <img className='w-6 mr-2 rounded-full' src={coin.image} alt={coin.name} />
          <p className='hidden sm:table-cell hover:text-blue-500 hover:underline'>{coin.name}</p>
        </div>
      </td>
      <td className='uppercase'>{coin.symbol}</td>
      <td>{coin.current_price}</td>
      <td>
        {coin.price_change_percentage_24h > 0 ? (
          <p className="text-green-600">+{coin.price_change_percentage_24h.toFixed(2)}%</p>
        ) : (
          <p className="text-red-600">🔻{coin.price_change_percentage_24h.toFixed(2)}%</p>
        )}
      </td>
      <td className='w-[180px] hidden md:table-cell'>{coin.total_volume}</td>
      <td className='w-[180px] hidden sm:table-cell'>{coin.market_cap}</td>
      <td className="p-3 w-32">
        {coin.sparkline_in_7d?.price ? (
          <Sparklines data={coin.sparkline_in_7d.price} limit={20} width={100} height={30}>
            <SparklinesLine color="blue" />
          </Sparklines>
        ) : (
          'N/A'
        )}
      </td>
    </tr>
  );
};

export default CoinItem;
