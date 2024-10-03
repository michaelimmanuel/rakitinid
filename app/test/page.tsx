"use client";
import ProcessorBrand from "@/components/simulasi/processor";
import ProcessorCard from "@/components/simulasi/processorCard";
import MotherBoard from "@/components/simulasi/motherboard";
import Ram from "@/components/simulasi/ram";
import Gpu from "@/components/simulasi/gpu";
import Storage from "@/components/simulasi/storage";
import Psu from "@/components/simulasi/psu";
import Casing from "@/components/simulasi/casing";

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
    storage : any[];
    selectedStorage : { name: string; price: number } | null;
    resetStorage : boolean;
    psu : any[];
    selectedPsu : { name: string; price: number } | null;
    resetPsu : boolean;
    casing : any[];
    selectedCasing : { name: string; price: number } | null;
    resetCasing : boolean;

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
    selectedGpu: null,
    storage: [],
    selectedStorage: null,
    resetStorage: false,
    psu: [],
    selectedPsu: null,
    resetPsu: false,
    casing: [],
    selectedCasing: null,
    resetCasing: false,
  });

  useEffect(() => {
    if (data.brand) {
      fetchProcessors(data.brand);
    }
  }, [data.brand]);

  const fetchStorage = async () => {
    try {
      const response = await axios.get(`/api/storage`);
      setData(prevData => ({
        ...prevData,
        storage: response.data,
      }));
    } catch (error) {
      console.error(error);
    }
  }

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

  const fetchPsu = async () => {
    try {
      const response = await axios.get(`/api/psu`);
      setData(prevData => ({
        ...prevData,
        psu: response.data,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  const fetchCasing = async () => {
    try {
      const response = await axios.get(`/api/casing`);
      setData(prevData => ({
        ...prevData,
        casing: response.data,
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
      storage: [],
      selectedStorage: null,
      resetStorage: true,
      psu: [],
      selectedPsu: null,
      resetPsu: true,
      casing: [],
      selectedCasing: null,
      resetCasing: true,
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
    fetchGpu();
    fetchStorage();
    fetchPsu();
    fetchCasing();
  };

  const handleRamData = (ram: { name: string; price: number }) => {
    setData(prevData => ({
      ...prevData,
      selectedRam: ram,
    }));
    
  }

  const getTotals = () => {
    const total = [
      data.selectedProcessor?.price || 0,
      data.selectedMotherboard?.price || 0,
      data.selectedRam?.price || 0,
      data.selectedGpu?.price || 0,
      data.selectedStorage?.price || 0,
      data.selectedPsu?.price || 0,
      data.selectedCasing?.price || 0,
    ].reduce((acc, curr) => acc + curr, 0);
    return total;
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
        <Storage
          storage={data.storage}
          sendStorageInfo={(data) => setData(prevData => ({ ...prevData, selectedStorage: data }))}
          resetSelectedStorage={data.resetStorage} 
        />
      </section>

      <section className="pt-10">
        <Psu 
          psus={data.psu}
          sendPsuInfo={(data) => setData(prevData => ({ ...prevData, selectedPsu: data }))}
          resetSelectedPsu={false} 
        />
      </section>

      <section className="pt-10">
        <Casing 
          casings={data.casing}
          sendCasingInfo={(data) => setData(prevData => ({ ...prevData, selectedCasing: data }))}
          resetSelectedCasing={false} 
        />
      </section>





      <section className="pt-10">
        <Gpu 
          gpus={data.gpu}
          sendGpuInfo={(data) => setData(prevData => ({ ...prevData, selectedGpu: data }))}
          resetSelectedGpu={false} 
        />
      </section>

      <section className="pt-10">
        <div className="flex justify-center">
          <h1 className="text-rakitin-orange text-4xl font-extrabold text-center">Total</h1>
        </div>
        <div className="flex justify-center pt-5">
          <h1 className="text-white text-4xl font-extrabold text-center">Rp {getTotals().toLocaleString()}</h1>
        </div>
      </section>
    </div>
  );
}


