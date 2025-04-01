import React from 'react';
import ThemeToggle from './ThemeToggle';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12 px-6 mt-10 shadow-lg rounded-t-lg">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* Support & Info Section */}
        <div className="flex flex-col md:flex-row md:col-span-2 justify-between space-y-8 md:space-y-0">
          <div>
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Support</h2>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-500 cursor-pointer transition-all duration-300">Help Center</li>
              <li className="hover:text-blue-500 cursor-pointer transition-all duration-300">Contact Us</li>
              <li className="hover:text-blue-500 cursor-pointer transition-all duration-300">API Status</li>
              <li className="hover:text-blue-500 cursor-pointer transition-all duration-300">Documentation</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Company</h2>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-500 cursor-pointer transition-all duration-300">About Us</li>
              <li className="hover:text-blue-500 cursor-pointer transition-all duration-300">Careers</li>
              <li className="hover:text-blue-500 cursor-pointer transition-all duration-300">Invest</li>
              <li className="hover:text-blue-500 cursor-pointer transition-all duration-300">Legal</li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Social Icons */}
        <div className="space-y-6">
          <div className="flex justify-center md:justify-end">
            <ThemeToggle />
          </div>
          <div className="text-center md:text-right">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Stay Updated with Crypto News</p>
            <form className="flex flex-col md:flex-row items-center md:items-end mt-3 gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full md:w-72 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-md">
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end space-x-5 mt-3">
            <AiOutlineInstagram className="text-2xl cursor-pointer hover:text-pink-500 transition-all duration-300" />
            <FaTwitter className="text-2xl cursor-pointer hover:text-blue-400 transition-all duration-300" />
            <FaFacebook className="text-2xl cursor-pointer hover:text-blue-600 transition-all duration-300" />
            <FaGithub className="text-2xl cursor-pointer hover:text-gray-600 transition-all duration-300" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;
