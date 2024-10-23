"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const links = [
  "/images/promo-amd-sept.png",
  "/images/main-banner.jpeg",
  "/images/main-banner.jpeg",
];

export default function CarouselComponent() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  }, [Autoplay({ delay: 3000 })]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Callback to track the index of the selected slide
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", onSelect);
    }
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {links.map((link, index) => (
          <div
            key={index}
            className={`embla__slide flex-shrink-0 w-[30%] mx-2 transition-transform duration-300 ease-in-out 
            ${selectedIndex === index ? 'scale-100 z-10' : 'scale-75 opacity-75'} `}
          >
            <Card className="bg-transparent">
              <CardContent className="flex items-center justify-center p-1">
                <div className="rounded-sm overflow-hidden">
                  <Image 
                    src={link}
                    alt={`banner-${index}`}
                    height={904}
                    width={896}
                    priority
                    quality={100}
                    className="rounded-md"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}