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
        <p className="text-center text-gray-600">
          You don't have any coins saved. Save a coin to add it to your watch list.
          <Link to="/" className="underline text-blue-500 hover:text-blue-700 ml-1">
            Click here
          </Link>{" "}
          to search coins.
        </p>
      ) : (
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <th className="px-4 py-2">Rank#</th>
              <th className="px-4 py-2">Coin</th>
              <th className="px-4 py-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id} className="border-b h-[60px] hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <td className="px-4 py-2">{coin?.rank}</td>
                <td className="px-4 py-2">
                  <Link to={`/coin/${coin.id}`} className="flex items-center">
                    <img className="w-8 h-8 mr-4 rounded-full" src={coin?.image} alt={coin?.name} />
                    <div>
                      <p className="text-sm font-medium">{coin?.name}</p>
                      <p className="text-gray-500 text-xs uppercase">{coin?.symbol}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <AiOutlineClose
                    className="text-red-500 cursor-pointer hover:text-red-700 transition"
                    onClick={() => removeCoin(coin.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCoins;
