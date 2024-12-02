"use client";

import { useState } from "react";
import { ItemDialog } from "./item-dialog";

export default function PcBuilder() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<{ [key: string]: { name: string; price: number } }>({});

  const data = ["Processor", "Motherboard", "GPU", "RAM", "Storage", "PSU", "Casing"];

  const handleItemClick = (item: string) => {
    setSelectedItem(item); // Open dialog with selected item
  };

  const handleChildData = (item: { name: string; price: number }) => {
    setSelectedData((prev) => ({
      ...prev,
      [selectedItem || ""]: item, // Save selected item by type
    }));
    setSelectedItem(null); // Close dialog
  };

  const handleBuildNow = () => {
    const number = 6281381024919
    const message = `Hello, Saya ingin konsultasi untuk pembuatan pc. Ini adalah spek yang akan saya gunakan:
    Processor: ${selectedData.Processor?.name}
    Motherboard: ${selectedData.Motherboard?.name}
    RAM: ${selectedData.RAM?.name}
    GPU: ${selectedData.GPU?.name}
    Storage: ${selectedData.Storage?.name}
    PSU: ${selectedData.PSU?.name}
    Casing: ${selectedData.Casing?.name}
    Total: Rp ${Object.values(selectedData).reduce((acc, curr) => acc + curr.price, 0).toLocaleString()}`; 
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank');
    
  };
  
  return (
    <div className="bg-white h-screen">
      <div className="bg-rakitin-bg w-full p-10 lg:p-20">
        <h1 className="text-4xl text-white">Build Your Perfect PC</h1>
        <p className="text-white font-light mt-2">
          Customize your PC with top-quality components and watch your build come to life.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 mt-10">
            {data.map((item, index) => (
                <div key={index} onClick={() => handleItemClick(item)}>
                <h1 className="text-xl font-bold mb-3">{item}</h1>
                <div className="bg-white flex flex-col h-auto rounded-lg text-black items-start p-3">
                    <p className="text-gray w-full font-semibold">
                    {selectedData[item]?.name || `Select ${item}`}
                    </p>
                    {selectedData[item]?.price && (
                    <p className="text-gray w-full text-sm">
                        Price: Rp {selectedData[item].price.toLocaleString()}
                    </p>
                    )}
                </div>
                </div>
            ))}
           
        </div>

        <div className=" flex flex-col items-center mt-10">
                <h1 className="text-xl font-bold mb-3">
                Total : Rp {Object.values(selectedData).reduce((acc, curr) => acc + curr.price, 0).toLocaleString()}
                </h1>
                <button
                className="bg-rakitin-orange text-white p-2 rounded-md w-content"
                onClick={handleBuildNow}
                >
                Build Now
                </button>
            </div>

      </div>
      <ItemDialog
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        itemName={selectedItem || ""}
        sendDataToParent={handleChildData}
      />
    </div>
  );
}
