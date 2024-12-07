'use client'

import Link from 'next/link'

export default function NavBar() {
 
  return (
    <nav className="fixed w-full z-[9999] bg-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center"></div>
        <div>
          <div className="ml-10 flex items-baseline space-x-4">
            <Link href="#hero" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="#service" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Services
            </Link>
            <Link href="#prebuild" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Pre-built PCs
            </Link>
            <Link href="#whatSetsUsApart" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Why Choose Us
            </Link>
            <Link href="#pcBuilder" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              PC Builder
            </Link>
            <Link href="#contact" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
  )
}

