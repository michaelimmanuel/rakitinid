"use client";

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import Autoplay from 'embla-carousel-autoplay';


export default function CarouselComponent() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[Autoplay({ delay: 3000 })]}
      className="flex min-w-screen justify-center content-center"
    >

    <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="bg-rakitin-bg">
                <CardContent className="flex items-center justify-center p-1 bg-rakitin-bg ">
                  <img className="justify-self-center min-w-screen mx-auto rounded-md" src="https://placehold.co/1440x300" alt="" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      </Carousel>

     
  )
}


 {/* <CarouselContent className="flex justify-center items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className=" justify-center content-evenly mx-auto">
              <img className="justify-self-center mx-auto rounded-md" src="https://placehold.co/1440x300" alt="" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel> */}
