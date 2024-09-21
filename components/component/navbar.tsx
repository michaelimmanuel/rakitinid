"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const isActiveLink = (path: string) => {
    return pathname === path;
  };

  // Smooth scrolling handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="backdrop-brightness-[.50] bg-rakitin-blue bg-opacity-30	backdrop-blur-2xl px-2 sm:px-4 py-6 rounded shadow sticky top-0 z-50">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" className="flex items-center">
          <img src="/images/rakitin3.png" alt="logo" className="w-48" />
        </a>

        <div className="flex items-center">
          <button
            type="button"
            onClick={handleMenuToggle}
            className="inline-flex items-center p-2 ml-3 bg-slate-800 text-sm text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <div
          className={`w-full md:block md:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <a
                href="/"
                className={`text-xl py-2 pr-4 pl-3 ${
                  isActiveLink("/") ? "text-rakitin-orange" : "text-gray-700"
                } block  no-underline hover:underline hover:decoration-rakitin-orange md:border-0 dark:text-gray-400`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#service"
                onClick={(e) => handleSmoothScroll(e, "service")}
                className={`text-xl py-2 pr-4 pl-3 ${
                  isActiveLink("/services")
                    ? "text-rakitin-orange"
                    : "text-gray-700"
                } block  no-underline hover:underline hover:decoration-rakitin-orange md:border-0 dark:text-gray-400`}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#simulation"
                onClick={(e) => handleSmoothScroll(e, "simulation")}
                className={`text-xl py-2 pr-4 pl-3 ${
                  isActiveLink("/simulation")
                    ? "text-rakitin-orange"
                    : "text-gray-700"
                } block  no-underline hover:underline hover:decoration-rakitin-orange md:border-0 dark:text-gray-400`}
              >
                Simulation
              </a>
            </li>
            <li>
              <a
                href="https://g.page/r/CcbQSGr4XD4BEBE/review"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xl py-2 pr-4 pl-3 ${
                  isActiveLink("/review")
                    ? "text-rakitin-orange"
                    : "text-gray-700"
                } block  no-underline hover:underline hover:decoration-rakitin-orange md:border-0 dark:text-gray-400`}
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
