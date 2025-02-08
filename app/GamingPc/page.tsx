"use client";
import React from 'react'
import axios from 'axios';
import PrebuildCard from '@/components/component/test/prebuilt-card';
import { useEffect } from 'react';

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
    <div className="bg-[#36343A] pt-10">
      
      <div className="w-full mx-auto dark text-foreground py-8 rounded-xl grid grid-cols-2 gap-5">
        {prebuilts.map((prebuilt, index) => (
            <PrebuildCard
                src={prebuilt.coverImage}
                alt={prebuilt.name}
                title={prebuilt.name}
                price={prebuilt.price}
            />))}
        </div>
    </div>
    </div>
  )
}



export default page