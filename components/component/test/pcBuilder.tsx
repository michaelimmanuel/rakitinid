"use client";

import { useState } from "react";
import { ItemDialog } from "./item-dialog";
import { ConfirmationDialog } from "./confirmation-dialog";
import CasingDialog from "./casing-dialog";

export default function PcBuilder() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<{ [key: string]: { name: string; price: number; socket_type_id?: string } }>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [openCasingDialog, setOpenCasingDialog] = useState(false); // State to handle CasingDialog
  const data = ["Processor", "Motherboard", "GPU", "RAM", "Storage", "PSU", "Casing"];

  const handleItemClick = (item: string) => {
    if (item === "Casing") {
      setSelectedItem(item);
      setOpenCasingDialog(true); // Open CasingDialog when Casing is clicked
    } else {
      setSelectedItem(item); // Open ItemDialog for other items
    }
  };

  const handleChildData = (item: { name: string; price: number; socket_type_id?: string }) => {
    
    setSelectedData((prev) => ({
      ...prev,
      [selectedItem || ""]: item, // Save selected item by type
    }));
    console.log(selectedData);
    setSelectedItem(null); // Close ItemDialog
    setOpenCasingDialog(false); // Close CasingDialog if it was open
  };

  const handleBuildNow = () => {
    setOpenDialog(true);
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

        <div className="flex flex-col items-center mt-10">
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

      {/* Item Dialog */}
      <ItemDialog
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        itemName={selectedItem || ""}
        sendDataToParent={handleChildData}
        socketId={selectedData["Processor"]?.socket_type_id}
      />

      {/* Casing Dialog */}
      <CasingDialog
        isOpen={openCasingDialog}
        onClose={() => setOpenCasingDialog(false)}
        sendDataToParent={handleChildData}
        itemName="Casing"
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        items={selectedData}
      />
    </div>
  );
}
