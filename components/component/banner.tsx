"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';

const links = [
  "/images/banner-1.jpeg",
  "/images/banner-3.jpeg",
  "/images/banner-2.jpeg",
];

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
        {links.map((link, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="bg-black">
                <CardContent className="flex items-center justify-center p-1">
                  <div className="rounded-sm overflow-hidden">
                    <img src={link} alt={`Image ${index + 1}`} className=" h-[500px]" />  
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
