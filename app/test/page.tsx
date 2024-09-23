"use client";
import ProcessorBrand from "@/components/simulasi/processor";
import ProcessorCard from "@/components/simulasi/processorCard";
import MotherBoard from "@/components/simulasi/motherboard";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Test() {
  const [childData, setChildData] = useState<string>('');
  const [processors, setProcessors] = useState<any[]>([]);
  const [selectedSocketType, setSelectedSocketType] = useState<number | null>(null);
  const [motherboards, setMotherBoards] = useState<any[]>([]);


  useEffect(() => {
    if (childData) {
      fetchProcessors(childData);
    }
  }, [childData]);

  const fetchProcessors = async (brand: string) => {
    try {
      const response = await axios.get(`/api/processor/${brand.toLowerCase()}`);
      setProcessors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMotherBoards = async (socketTypeId: number) => {
    try {
      const response = await axios.get(`/api/motherboard/${socketTypeId}`);
      setMotherBoards(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChildData = (data: string) => {
    setChildData(data);
  };

  const handleSocketTypeSelect = (socketTypeId: number) => {
    setSelectedSocketType(socketTypeId);
    fetchMotherBoards(socketTypeId);
  };


  return (
    <div className="bg-black h-lvh">
      <section className="flex justify-center w-lvh pt-10">
        
          <ProcessorBrand sendBrand={handleChildData} />
        
      </section>
      

      <section className="pt-10">
        <ProcessorCard processors={processors} onSocketTypeSelect={handleSocketTypeSelect} />
      </section>

      <section className="pt-10">
        <MotherBoard motherboards={motherboards} sendMotherBoard={console.log} />
      </section>
      
    

      
    </div>


  );
}
