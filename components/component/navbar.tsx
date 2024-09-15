"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Move usePathname inside the component

  const handleMenuToggle = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const isActiveLink = (path: string) => {
    return pathname === path; // Use the pathname here
  };

  return (
    <nav className="bg-slate-800 px-2 sm:px-4 py-6 rounded shadow sticky top-0 z-50">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" className="flex items-center">
          <img src="/images/rakitin3.png" alt="logo" className="w-36" />
        </a>

        <div className="flex items-center">
          <button
            type="button"
            onClick={handleMenuToggle}
            className="inline-flex items-center p-2 ml-3 bg-slate-800 text-sm text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <div className={`w-full md:block md:w-auto ${isMenuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <a
                href="/"
                className={`text-xl py-2 pr-4 pl-3 ${
                  isActiveLink("/") ? "text-rakitin-orange" : "text-gray-700"
                } block border-b border-gray-100 no-underline hover:underline hover:decoration-rakitin-orange md:border-0 dark:text-gray-400`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className={`text-xl py-2 pr-4 pl-3 ${
                  isActiveLink("/about") ? "text-rakitin-orange" : "text-gray-700"
                } block border-b border-gray-100 no-underline hover:underline hover:decoration-rakitin-orange md:border-0 dark:text-gray-400`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/services"
                className={`text-xl py-2 pr-4 pl-3 ${
                  isActiveLink("/services") ? "text-rakitin-orange" : "text-gray-700"
                } block border-b border-gray-100 no-underline hover:underline hover:decoration-rakitin-orange md:border-0 dark:text-gray-400`}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/simulation"
                className={`text-xl py-2 pr-4 pl-3 ${
                  isActiveLink("/simulation") ? "text-rakitin-orange" : "text-gray-700"
                } block border-b border-gray-100 no-underline hover:underline hover:decoration-rakitin-orange md:border-0 dark:text-gray-400`}
              >
                Simulation
              </a>
            </li>
            <li>
              <a
                href="/review"
                className={`text-xl py-2 pr-4 pl-3 ${
                  isActiveLink("/review") ? "text-rakitin-orange" : "text-gray-700"
                } block border-b border-gray-100 no-underline hover:underline hover:decoration-rakitin-orange md:border-0 dark:text-gray-400`}
              >
                Review Us!
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
