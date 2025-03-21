"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";


interface ItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  items : {[key : string] : { name: string; price: number }};
}

export function ConfirmationDialog({ isOpen, onClose, items }: ItemDialogProps) {


    const getTotalPrice = () => {
        let total = 0;
        Object.keys(items).map((key, index) => {
            total += items[key].price;
        });
        return total;
    }

    const handleSubmit = async () => {

      

        const payload = {
          motherboard: items.Motherboard?.name || "",
          processor: items.Processor?.name || "",
          ram: items.RAM?.name || "",
          gpu: items.GPU?.name || "",
          storage1: items["Storage 1"]?.name || "",
          storage2: items["Storage 2"]?.name || "",
          psu: items.PSU?.name || "",
          casing: items.Casing?.name || "",
          fan1 : items["Fan 1"]?.name || "",
          fan2 : items["Fan 2"]?.name || "",
          fan3 : items["Fan 3"]?.name || "",
          fan4 : items["Fan 4"]?.name || "",
          accessories1 : items["Accessories 1"]?.name || "",
          accessories2 : items["Accessories 2"]?.name || "",
          accessories3 : items["Accessories 3"]?.name || "",
          accessories4 : items["Accessories 4"]?.name || "",
          accessories5 : items["Accessories 5"]?.name || "",
          motherboardPrice: items.Motherboard?.price || 0,
          processorPrice: items.Processor?.price || 0,
          ramPrice: items.RAM?.price || 0,
          gpuPrice: items.GPU?.price || 0,
          storage1Price: items["Storage 1"]?.price || 0,
          storage2Price: items["Storage 2"]?.price || 0,
          psuPrice: items.PSU?.price || 0,
          casingPrice: items.Casing?.price || 0,
          fan1Price : items["Fan 1"]?.price || 0,
          fan2Price : items["Fan 2"]?.price || 0,
          fan3Price : items["Fan 3"]?.price || 0,
          fan4Price : items["Fan 4"]?.price || 0,
          accessories1Price : items["Accessories 1"]?.price || 0,
          accessories2Price : items["Accessories 2"]?.price || 0,
          accessories3Price : items["Accessories 3"]?.price || 0,
          accessories4Price : items["Accessories 4"]?.price || 0,
          accessories5Price : items["Accessories 5"]?.price || 0,
          cooler : items.Cooler?.name || "",
          coolerPrice : items.Cooler?.price || 0,
          monitor1 : items["Monitor 1"]?.name || "",
          monitor2 : items["Monitor 2"]?.name || "",
          monitor1Price : items["Monitor 1"]?.price || 0,
          monitor2Price : items["Monitor 2"]?.price || 0,
          totalPrice: getTotalPrice(),
        };

        console.log(payload)

    

         
        try {
          await axios.post("/api/builds", payload).then((res) => {
            // get id from data
            const id = res.data.id;
            const number = 6281381024919
            

            const item_msg = Object.entries(payload)
            .filter(([key, value]) => value !== undefined && value !== "" && value !== 0 && !/Price$/.test(key))
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n");
           console.log(item_msg)
                  
          const message = `Hello, Saya ingin konsultasi untuk pembuatan PC. Ini adalah spek yang akan saya gunakan: \nbuild_id: ${id} \n${item_msg} \nTotal: Rp ${payload.totalPrice.toLocaleString()}`;
          window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`);
          });


          onClose();
        } catch (error) {
          console.error("Error submitting build:", error);
          alert("Failed to submit the build. Please try again.");
        }
      };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black max-h-[90%] max-w-[90%] overflow-y-auto">
                <DialogHeader>
                <DialogTitle>Confirmation</DialogTitle>
                </DialogHeader>
                <ul className="space-y-4 overflow-y-auto">
                    {Object.keys(items).map((key, index) => (
                        <li key={index} className="p-2 border rounded-lg">
                        <p className="font-bold">{key}</p>
                        <p className="text-gray-500">{items[key].name}</p>
                        <p className="text-gray-500">Rp {items[key].price.toLocaleString()}</p>
                        </li>
                    ))} 
                </ul>
                <p className="font-bold">Total</p>
                <p className="text-gray-500">Rp {getTotalPrice().toLocaleString()}</p>
                <Button onClick={handleSubmit} className="bg-rakitin-orange text-white p-2 rounded-md w-content mt-4"> Consult </Button>
            </DialogContent>
        </Dialog>
    );

}