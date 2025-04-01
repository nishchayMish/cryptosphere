import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserContext } from "../context/AuthContext";

const SavedCoins = () => {
  const [coins, setCoins] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?.email) return;

    const coinDoc = doc(db, "users", user.email);
    const unsubscribe = onSnapshot(coinDoc, (doc) => {
      setCoins(doc.data()?.watchList || []);
    });

    return () => unsubscribe();
  }, [user?.email]);

  const removeCoin = async (coinId) => {
    if (!user?.email) return;

    try {
      const coinDoc = doc(db, "users", user.email);
      const filteredCoins = coins.filter((coin) => coin.id !== coinId);
      await updateDoc(coinDoc, { watchList: filteredCoins });
    } 
    catch (error) {
      console.error("Error removing coin:", error);
    }
  };

  return (
    <div className="p-4">
      {coins.length === 0 ? (
        <p className="text-center text-sm md:text-base">
          You don't have any coins saved. Save a coin to add it to your watch list.
          <Link to="/" className="underline text-blue-500 hover:text-blue-700 ml-1">
            Click here
          </Link>{" "}
          to search coins.
        </p>
      ) : (
        <div className="overflow-x-auto">
          {/* Desktop View (Keeps the Table Format) */}
          <table className="hidden md:table w-full border-collapse text-left">
            <thead>
              <tr className="border-b bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                <th className="px-4 py-2 text-center w-[10%]">Rank#</th>
                <th className="px-4 py-2 w-[70%]">Coin</th>
                <th className="px-4 py-2 text-center w-[20%]">Remove</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <tr key={coin.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <td className="px-4 py-3 text-center">{coin?.rank}</td>
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <img className="w-8 h-8 rounded-full" src={coin?.image} alt={coin?.name} />
                    <div>
                      <p className="text-sm font-medium">{coin?.name}</p>
                      <p className="text-gray-500 text-xs uppercase">{coin?.symbol}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button 
                      onClick={() => removeCoin(coin.id)} 
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
                    >
                      <AiOutlineClose className="text-red-500 text-lg md:text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile View (Stacked Layout) */}
          <div className="md:hidden flex flex-col gap-4">
            {coins.map((coin) => (
              <div key={coin.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-semibold">{coin?.rank}</span>
                  <img className="w-8 h-8 rounded-full" src={coin?.image} alt={coin?.name} />
                  <div>
                    <p className="text-sm font-medium">{coin?.name}</p>
                    <p className="text-gray-500 text-xs uppercase">{coin?.symbol}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeCoin(coin.id)} 
                  className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
                >
                  <AiOutlineClose className="text-red-500 text-lg" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedCoins;
