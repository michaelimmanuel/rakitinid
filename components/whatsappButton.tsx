'use client'

import React from 'react'
import Image from 'next/image'

interface AuthenticWhatsAppButtonProps {
  phoneNumber: string
  message?: string
}

export default function AuthenticWhatsAppButton({ phoneNumber, message = 'Hello!' }: AuthenticWhatsAppButtonProps) {
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-24 right-24 z-50 flex h-20 w-20 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-all hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative h-20 w-20 overflow-hidden rounded-full">
        <Image
          src="/wa_icon.svg"
          alt="WhatsApp Logo"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </button>
  )
}
