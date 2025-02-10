"use client";
import React from 'react'
import axios from 'axios';
import PrebuildCard from '@/components/component/test/prebuilt-card';
import { useEffect } from 'react';

interface PrebuiltItem {
    coverImage: string;
    createdAt: string;
    description: string;
    subtitle: string;
    id: number;
    image: string;
    name: string;
    price: number;
    items: string[];
    updatedAt: string;
    discountPrice: number;
}

const page = () => {
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

    useEffect(() => {
        fetchData()
    }, [])

    const [loading, setLoading] = React.useState(false)
    const [prebuilts, setPrebuilts] = React.useState<PrebuiltItem[]>([])
    const [selectedData, setSelectedData] = React.useState<PrebuiltItem | null>(null)
    const [open, setOpen] = React.useState(false)

  return (
    <div>
    <div className="bg-black pt-10 items-center justify-center">
      
      <div className="text-foreground py- rounded-xl grid grid-cols-3 gap-5 items-center justify-items-center">
        {prebuilts.map((prebuilt, index) => (
            <PrebuildCard
                src={prebuilt.coverImage}
                subtitle={prebuilt.subtitle}
                alt={prebuilt.name}
                title={prebuilt.name}
                price={prebuilt.price}
                items={prebuilt.items}
                discountPrice={prebuilt.discountPrice}
            />))}
        </div>
    </div>
    </div>
  )
}



export default page