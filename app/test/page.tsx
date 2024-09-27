"use client";
import ProcessorBrand from "@/components/simulasi/processor";
import ProcessorCard from "@/components/simulasi/processorCard";
import MotherBoard from "@/components/simulasi/motherboard";
import Ram from "@/components/simulasi/ram";
import Gpu from "@/components/simulasi/gpu";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Test() {

  const [data, setData] = useState<{
    brand: string;
    processors: any[];
    selectedProcessor: { socket_type_id: number; name: string; price: number } | null;
    motherboards: any[];
    selectedMotherboard: { formFactor: string; name: string; price: number, memory_type : string } | null;
    resetProcessor: boolean;
    ram : any[];
    selectedRam : { name: string; price: number } | null;
    resetRam : boolean;
    gpu : any[];
    selectedGpu : { name: string; price: number } | null;
  }>({
    brand: '',
    processors: [],
    selectedProcessor: null,
    motherboards: [],
    selectedMotherboard: null,
    resetProcessor: false,
    ram: [],
    selectedRam: null,
    resetRam: false,
    gpu: [],
    selectedGpu: null
  });

  useEffect(() => {
    if (data.brand) {
      fetchProcessors(data.brand);
    }
  }, [data.brand]);

  const fetchProcessors = async (brand: string) => {
    try {
      const response = await axios.get(`/api/processor/${brand.toLowerCase()}`);
      setData(prevData => ({
        ...prevData,
        processors: response.data,
        resetProcessor: false,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMotherBoards = async (socketTypeId: number) => {
    try {
      const response = await axios.get(`/api/motherboard/${socketTypeId}`);
      setData(prevData => ({
        ...prevData,
        motherboards: response.data,
        resetProcessor: false,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRam = async (memory_type : string) => {
    try {
      const response = await axios.get(`/api/ram/${memory_type}`);
      setData(prevData => ({
        ...prevData,
        ram: response.data,
        resetRam: false,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGpu = async () => {
    try {
      const response = await axios.get(`/api/gpu`);
      setData(prevData => ({
        ...prevData,
        gpu: response.data,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  const handleChildData = (brand: string) => {
    setData({
      brand,
      processors: [],
      selectedProcessor: null,
      motherboards: [],
      selectedMotherboard: null,
      resetProcessor: true,
      ram: [],
      selectedRam: null,
      resetRam: true,
      gpu: [],
      selectedGpu: null,
    });
  };

  const handleProcessorData = (processor: { socket_type_id: number; name: string; price: number }) => {
    fetchMotherBoards(processor.socket_type_id);
    setData(prevData => ({
      ...prevData,
      selectedProcessor: processor,
    }));
  };

  const handleMotherBoardData = (motherboard: { formFactor: string; name: string; price: number, memory_type : string }) => {
    fetchRam(motherboard.memory_type);
    setData(prevData => ({
      ...prevData,
      selectedMotherboard: motherboard,
    }));
  };

  const handleRamData = (ram: { name: string; price: number }) => {
    setData(prevData => ({
      ...prevData,
      selectedRam: ram,
    }));
    fetchGpu();
  }

  return (
    <div className="bg-black">
      <section className="flex justify-center w-lvh pt-10">
        <ProcessorBrand sendBrand={handleChildData} />
      </section>

      <section className="pt-10">
        <ProcessorCard 
          processors={data.processors} 
          sendProcessorInfo={handleProcessorData} 
          resetSelectedProcessor={data.resetProcessor} 
        />
      </section>

      <section className="pt-10">
        <MotherBoard 
          motherboards={data.motherboards} 
          sendMotherBoard={handleMotherBoardData} 
          resetSelectedProcessor={data.resetProcessor} 
        />
      </section>

      <section className="pt-10">
        <Ram 
          rams={data.ram} 
          sendRamInfo={handleRamData} 
          resetSelectedRam={data.resetRam}
        />
      </section>

      <section className="pt-10">
        <Gpu 
          gpus={data.gpu}
          sendGpuInfo={(data) => setData(prevData => ({ ...prevData, selectedGpu: data }))}
          resetSelectedGpu={false} 
        />
      </section>

    </div>
  );
}


