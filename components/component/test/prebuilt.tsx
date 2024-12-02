'use client'

import * as React from "react"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import PrebuildCard from "./prebuilt-card"

export default function PeekCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const images = Array.from({ length: 5 }).map((_, index) => ({
    src: `/images/gamingbeast.webp`,
    alt: `Slide ${index + 1}`
  }))

  return (
    <div className="bg-[#36343A] pt-10">

        <div className="ml-10">
            <h1 className="text-3xl font-semibold text-left text-white">Explore Our Prebuilt PC Collection</h1>
            <p className="text-lg text-white text-left font-light">High-performance, expertly crafted PCs</p>
        </div>

        <div className="w-full mx-auto dark text-foreground py-8 rounded-xl">
        <Carousel
            opts={{
            align: "center",
            }}
            setApi={setApi}
            className=" relative overflow-x-visible"
        >
            <CarouselContent className="">
            {images.map((image, index) => (
                <CarouselItem 
                key={index} 
                className="pl-4 basis-full md:basis-[45%] lg:basis-[30%]"
                >
                <div className="p-1 mx-2">
                    <PrebuildCard src={image.src} alt={image.alt} title="Gaming Beast" />
                </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            
            {/* Navigation and indicators */}
            <div className="mt-8 flex items-center justify-center gap-8">
            <CarouselPrevious 
                variant="outline" 
                className="static translate-y-0 h-10 w-10 rounded-full border-white bg-[#36343A] hover:bg-[#36343A]"
            />
            
            {/* Indicators */}
            <div className="flex gap-2 items-center">
                {Array.from({ length: count }).map((_, index) => (
                <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className={cn(
                    "h-2 w-2 rounded-full bg-black transition-colors",
                    index === current && "bg-primary scale-125"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => api?.scrollTo(index)}
                />
                ))}
            </div>
            
            <CarouselNext 
                variant="outline" 
                className="static translate-y-0 h-10 w-10 rounded-full border-white bg-[#36343A] hover:bg-[#36343A]"
            />
            </div>
        </Carousel>
        </div>
    </div>
  )
}

