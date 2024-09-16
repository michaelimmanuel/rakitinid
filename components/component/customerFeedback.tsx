"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { Card, CardContent, CardDescription } from "../ui/card";

import Autoplay from 'embla-carousel-autoplay';

const data = [
    {
        "name" : "John Doe",
        "rating" : 5,
        "comment" : "I am very satisfied with the service provided by Rakitin Tech. The staff are very friendly and helpful. I would definitely recommend Rakitin Tech to my friends and family."
    },
    {
        "name" : "Jane Doe", 
        "rating" : 4,
        "comment" : "The service provided by Rakitin Tech is excellent. The staff are friendly and helpful. I would recommend Rakitin Tech to my friends and family."
    },
    {
        "name" : "John Smith",
        "rating" : 3,
        "comment" : "The service provided by Rakitin Tech is good. The staff are friendly and helpful. I would recommend Rakitin Tech to my friends and family."
    },
    {
        "name" : "John Smith",
        "rating" : 3,
        "comment" : "The service provided by Rakitin Tech is good. The staff are friendly and helpful. I would recommend Rakitin Tech to my friends and family."
    },
    {
        "name" : "John Smith",
        "rating" : 3,
        "comment" : "The service provided by Rakitin Tech is good. The staff are friendly and helpful. I would recommend Rakitin Tech to my friends and family."
    },
    {
        "name" : "John Smith",
        "rating" : 3,
        "comment" : "The service provided by Rakitin Tech is good. The staff are friendly and helpful. I would recommend Rakitin Tech to my friends and family."
    }
]



export default function CustomerFeedback() {
    return (

        <div className="">
            <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight text-start text-rakitin-white mt-10 mx-20">
                Thousand Of <span className="text-rakitin-orange">Satisfied Customers</span>
            </h1>
            <Carousel
                opts={{
                    align: "start",
                }}
                plugins={[Autoplay({ delay: 3000 })]}
                className="flex justify-center content-center mx-10 my-10">                
                <CarouselContent>
                    {data.map((item, index) => (
                        <CarouselItem key={index} className="lg:basis-1/3 md:basis-1/1 sm:basis-1/1 min-h-90">
                            <Card className="bg-rakitin-light-blue w-full sm:w-full md:w-full lg:w-full">
                                <CardContent className="p-5 sm:p-3 md:p-4 lg:p-5">
                                    <h1 className="text-center text-2xl font-bold text-white">{item.name}</h1>
                                    
                                    <p className="text-justify text-white text-lg mt-5">{item.comment}</p>
                                    <div className="flex items-center justify-left">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <span key={i} className="text-[#FFB81C] mr-1">★</span>
                                        ))}
                                        {[...Array(5 - item.rating)].map((_, i) => (
                                            <span key={i} className="text-[#FFB81C] mr-1">☆</span>
                                        ))}
                                    </div>
                                
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>

            </Carousel>
        </div>

    )
}