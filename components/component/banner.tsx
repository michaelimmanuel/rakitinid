"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import Image from "next/image";

const links = [
  "/images/main-banner.jpeg",
  "/images/main-banner.jpeg",
  "/images/main-banner.jpeg",
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
            <div className="p-1 bg-transparent">
              <Card className="bg-transparent">
                <CardContent className="flex items-center justify-center p-1">
                  <div className="rounded-sm overflow-hidden">
                     <Image src={link} alt="banner" height={300} width={600} />
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
