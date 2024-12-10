"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateDialog from "./createDialog";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EditDialog from "./editDialog";

import { cn } from "@/lib/utils";
import PrebuildCard from "@/components/component/test/prebuilt-card";

interface PrebuiltItem {
    coverImage : string;
    createdAt : string; 
    description : string;
    id : number;
    image : string;
    name : string;
    price : number;
    updatedAt : string;
}

export default function PrebuiltPage() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [prebuilts, setPrebuilts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PrebuiltItem | null>(null);
  

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
    fetchData();
  }, [api]);

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

  const handleCreate = async () => {
    setCreateDialog(true);
  };

  const handleClick = (item : any) => {
    setSelectedItem(item);
    setEditDialog(true);
  }

  return (
    <div className="flexrow">
      <h1>Prebuilt Section</h1>
      <Button variant={"success"} className="mt-5" onClick={handleCreate}>
        Create New Prebuilt
      </Button>

      <div className="bg-[#36343A] pt-10">
        <div className="ml-10">
          <h1 className="text-3xl font-semibold text-left text-white">
            Explore Our Prebuilt PC Collection
          </h1>
          <p className="text-lg text-white text-left font-light">
            High-performance, expertly crafted PCs
          </p>
        </div>

        <div className="w-full mx-auto dark text-foreground py-8 rounded-xl">
          <Carousel
            opts={{
              align: "center",
            }}
            setApi={setApi}
            className="relative overflow-x-visible"
          >
            <CarouselContent className="">
              {prebuilts.map((prebuilt, index) => (
                <div onClick={() => handleClick(prebuilt)}>
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full md:basis-[45%] lg:basis-[30%]"
                >
                  <div className="p-1 mx-2">
                    <PrebuildCard
                      src={prebuilt.coverImage}
                      alt={prebuilt.name}
                      title={prebuilt.name}
                      price={prebuilt.price}
                    />
                  </div>
                </CarouselItem>
                </div>
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

      <CreateDialog
        isOpen={createDialog}
        onClose={() => setCreateDialog(false)}
        onSave={fetchData}
      />

      <EditDialog 
        isOpen={editDialog}
        onClose={() => setEditDialog(false)}
        onSave={fetchData}
        data = {selectedItem}
      />

    </div>
  );
}