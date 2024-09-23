"use client";
import Processor from "@/components/simulasi/processor";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Test() {
  const [childData, setChildData] = useState<string>('');
  const [processors, setProcessors] = useState<any[]>([]);

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

  const handleChildData = (data: string) => {
    setChildData(data);
  };

  return (
    <div className="bg-black h-lvh">
      <section className="flex justify-center w-lvh pt-10">
        
        <div className="text-white text-4xl font-bold">
          
          <Processor sendBrand={handleChildData} />
        </div>
        
      </section>
      
      <section>
        <h2 className="text-white text-2xl font-bold">Processors:</h2>
        <ul>
          {processors.map((processor) => (
            <li key={processor.id} className="text-white">
              {processor.name} - {processor.brand}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
