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
import { cn } from "@/lib/utils"
import PrebuildCard from "./prebuilt-card"
import axios from "axios"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"

interface PrebuiltItem {
  coverImage: string;
  createdAt: string;
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
  updatedAt: string;
}

export default function PeekCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [prebuilts, setPrebuilts] = React.useState<PrebuiltItem[]>([])
  const [selectedData, setSelectedData] = React.useState<PrebuiltItem | null>(null)
  const [open, setOpen] = React.useState(false)

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/prebuilt");
      console.log(response.data);
      setPrebuilts(response.data);
    } catch (error) {
      console.error("Failed to fetch prebuilts:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!api) {
      return
    }
    fetchData()

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const handleClick = (prebuilt: PrebuiltItem) => {
    setSelectedData(prebuilt)
    setOpen(true)
    console.log(prebuilt)
  }


  const sendWa = () => {
    const message = `Halo, saya tertarik dengan Prebuilt-${selectedData?.name} dengan harga Rp ${selectedData?.price.toLocaleString()}. Apakah masih tersedia?`
    window.open(`https://wa.me/6281381024919?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <div>
      <div className="bg-[#36343A] pt-10">
        <div className="ml-10 mt-28">
          <h1 className="text-3xl font-semibold text-left text-white">Explore Our Prebuilt PC Collection</h1>
          <p className="text-lg text-white text-left font-light">High-performance, expertly crafted PCs</p>
        </div>

        <div className="w-full mx-auto dark text-foreground py-8 rounded-xl ">
          <Carousel
            opts={{
              align: "center",
            }}
            setApi={setApi}
            className="relative overflow-x-visible  mb-28"
          >
            <CarouselContent className="">
              {prebuilts.map((prebuilt, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-4 basis-full md:basis-[50%] lg:basis-[25%]"
                >
                  <div className="p-1 mx-2" onClick={() => handleClick(prebuilt)}>
                    <PrebuildCard
                      src={prebuilt.coverImage}
                      alt={prebuilt.name}
                      title={prebuilt.name}
                      price={prebuilt.price}
                    />
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

      {/* Product Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-7xl w-[90vw] max-h-[90vh] overflow-auto bg-[#1e2124]">
            {selectedData && (
            <div className="grid gap-6 sm:grid-cols-2 mt-5">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={selectedData.image}
                  alt={selectedData.name}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div className="space-y-4">
                  <DialogHeader className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <DialogTitle className="text-2xl sm:text-3xl font-bold">{selectedData.name}</DialogTitle>
                      <span className="text-xl sm:text-xl font-light text-green-600">Rp {selectedData.price.toLocaleString()}</span>
                    </div>
                    <DialogDescription className="text-base sm:text-lg">
                      {selectedData.description}
                    </DialogDescription>
                  </DialogHeader>
                </div>
                <Button onClick={sendWa} className="w-full bg-[#7289da] hover:bg-primary font-bold text-white mt-4">Contact Admin</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

