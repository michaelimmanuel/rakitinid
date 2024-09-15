"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

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
    }
]



export default function CustomerFeedback() {
    return (

        <div className="">
            <h1 className="text-4xl font-bold text-start text-rakitin-white mt-10 mx-20">
                Thousand Of Satisfied Customers
            </h1>
            <Carousel
                opts={{
                    align: "start",
                }}
                plugins={[Autoplay({ delay: 3000 })]}
                className="flex justify-center content-center mx-10 my-10">
            <div className="flex flex-col min-width-screen bg-rakitin-bg justify-center justify-items-center content-center">
                
                <CarouselContent>
                    {data.map((item, index) => (
                        <CarouselItem key={index} className="lg:basis-1/3 md:basis-1/2 sm:basis-1/1 aspect-square min-h-90">
                        <div key={index} className="p-5 bg-rakitin-blue rounded-lg shadow-lg">
                            {/* Card Header */}
                            <div className="flex items-center mb-4">
                                <div className="flex-shrink-0">
                                    
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-xl font-bold text-gray-800 uppercase">{item.name}</h2>
                  
                                    <div className="flex items-center">

                                        {[...Array(item.rating)].map((_, i) => (
                                            <span key={i} className="text-[#FFB81C] mr-1">★</span>
                                        ))}
                                        <span className="ml-2 text-gray-500">{item.rating}/5</span>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div className="text-gray-700">
                                <p className="italic">"{item.comment}"</p>
                            </div>
                        </div>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
            </div>

            </Carousel>
        </div>

    )
}