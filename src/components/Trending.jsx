import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Trending = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);

  const navigate = useNavigate();

  const fetchCoins = async () => {

    try {
      const res = await fetch('https://api.coingecko.com/api/v3/search/trending')
      const data = await res.json()
      setTrendingCoins(data.coins)
    } 
    catch (err) {
      console.error('Error fetching trending coins:', err)
    }
  }

  useEffect(() => {
    fetchCoins()
  }, [])

  const handleClick = (id) => {
    navigate(`/coin/${id}`);
  }

  return (
    <div className='rounded-div my-12 py-8 text-primary'>
      <h1 className='text-2xl font-bold py-4'>🔥 Trending Coins</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {trendingCoins.map((coin) => (
          <div onClick={()=>handleClick(coin.item.id)}
            key={coin.item.id} 
            className='rounded-div flex justify-between p-4 transition-transform transform hover:scale-105 ease-in-out duration-300'
          >
            <div className='flex w-full justify-between items-center'>
              <div className='flex items-center'>
                <img className='w-10 h-10 mr-3 rounded-full' src={coin.item.small} alt={coin.item.name} />
                <div>
                  <p className='font-bold'>{coin.item.name}</p>
                  <p className='text-gray-400 uppercase text-sm'>{coin.item.symbol}</p>
                </div>
              </div>
              <div className='flex items-center'>
                <img className='w-5 h-5 mr-1' src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" alt='BTC' />
                <p className='text-green-500 font-semibold'>{coin.item.price_btc.toFixed(7)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Trending
