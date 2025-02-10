"use client";
import React from 'react'
import PrebuildCard from "./prebuilt-card"
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const PrebuiltCategory = () => {
  return (
    <div className='flex flex-col w-screen bg-rakitin-bg text-[#f1f0e6] pb-10 px-10 pt-10'>

        <div className="flex flex-col mb-20 ml-10">
          <h1 className="text-3xl font-semibold text-left">Explore Our Prebuilt PC Collection</h1>
          <p className="text-lg text-left font-light">High-performance, expertly crafted PCs</p>
        </div>

        <div className='w-full flex flex-col lg:flex-row justify-around gap-10'>
          <div className='flex flex-col  p-10 w-full'>
            <Image src={"https://images.prismic.io/aftershock-singapore/ZsMstUaF0TcGJDTF_Maskgroup-3-.png?auto=format,compress"} 
              alt={"gaming pc"} width={350} height={350} className='mx-auto rounded-xl'/>
            <h1 className="text-center font-bold text-3xl mt-10">Gaming/Editing PC</h1>
            <p className='w-full text-justify overflow-hidden mt-6'>
              Get the advantage and power through the most demanding games on the planet with buttery smooth frame rates with our top-of-the-line gaming PCs built to deliver unrivaled performance. We craft your dream gaming PC, down to the finest of details.
            </p>
            <Button className='bg-red text-white font-semibold mt-5  hover:text-black' onClick={
              () => {
                window.location.href = '/GamingPc';
              }
            }>Shop Our Gaming PC</Button>
          </div>
          <div className='flex flex-col p-10 w-full'>
            <Image src={"https://images.prismic.io/aftershock-singapore/ZsMs80aF0TcGJDTM_Group54.png?auto=format,compress"} 
              alt={"gaming pc"} width={350} height={350} className='mx-auto rounded-xl'/>
            <h1 className="text-center font-bold text-3xl mt-10">Workstation PC</h1>
            <p className='w-full text-justify overflow-hidden mt-6'>
            Our workstations are custom made for your commercial or creator applications. Whether you are effortlessly rendering 4K videos, running AI models or tearing through 3D renders, our workstations are designed to offer reliable world class performance that goes the extra mile.
            </p>
          
            <Button className='bg-red text-white font-semibold mt-5 hover:text-black' onClick={
              () => {
                window.location.href = '/WorkstationPc';
              }
            }>Shop Our Gaming PC</Button>
     
          </div>
        </div>

    </div>
  )
}

export default PrebuiltCategory
