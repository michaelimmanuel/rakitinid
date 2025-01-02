"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

import {useState, useEffect, use} from 'react';
import axios from 'axios';

export default function HeroPage() {

    const [images, setImages] = useState<any[]>([]);
    useEffect(() => {
        axios
            .get("/api/banner")
            .then((response) => {
                console.log("Response data:", response.data);
                setImages(response.data);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
            });
    }, []);



    return (
        <div>        
                <div className="hidden lg:block relative z-0">
                    <div className="relative z-0 h-screen overflow-hidden">
                    {/* Hero Image */}
                    <Carousel className="absolute inset-0 w-full h-full">
                        <CarouselContent className='w-dvh h-dvh'>
                        {images.map((image, index) => (
                        <CarouselItem key={index} className='w-dvh h-dvh relative'>
                            <div className="relative w-full h-full">
                            <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            style={{ objectFit: "cover" }}
                            className="object-cover rounded-md"
                            loading='eager'
                            quality={100}
                            />
                            </div>
                        </CarouselItem>
                        ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                        </Carousel>
                    {/* Text Container */}
                    <div className="flex items-center justify-center h-full">
                        <div className="mt-[50px] mb-10 text-white sm:m-auto p-5 lg:p-20 max-w-3xl text-center lg:text-left bg-[#4E5F7E] rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-[8%] lg:ml-10">
                        <h1 className="text-3xl lg:text-5xl font-semibold"> 
                            BUILD YOUR DREAM <br/> PC TODAY.
                        </h1>
                        <p className="text-lg lg:text-2xl mt-10 lg:mt-20 lg:tracking-wide font-normal text-justify sm:text-left">
                            From gaming rigs to high-performance workstations, Rakitinlah.id offers custom PC solutions tailored to your needs. Experience power, precision, and personalized design.
                        </p>
                        <div className="lg:flex justify-between sm:h-3xl lg:h-full mt-5 lg:mt-10">
                            <a href="#pcBuilder">
                            <Button className="bg-rakitin-orange text-white h-lg text-lg lg:h-12">
                                Start Building Now
                            </Button>
                            </a>
                            <a href="#prebuild" className="self-center lg:mt-0">
                            <h1 className="self-center mt-5 mb-5 text-sm tracking-tight lg:text-lg underline underline-offset-8 decoration-orange">
                                Explore Ready-to-Ship PCs
                            </h1>
                            </a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden  bg-black block  ">
                 <Carousel className="">
                        <CarouselContent className=' h-[30dvh] mt-[65px]'>
                        {images.map((image, index) => (
                        <CarouselItem key={index} className=' h-full relative'>
                            <div className="relative w-screen h-full">
                            <Image
                            src={image.src}
                            alt={image.alt}
                            layout="fill"
                            objectFit="cover"
                            className="object-cover rounded-md"
                            loading='eager'
                            quality={100}
                            />
                            </div>
                        </CarouselItem>
                        ))}
                        </CarouselContent>
                        </Carousel>
            </div>
        </div>

    );
}
