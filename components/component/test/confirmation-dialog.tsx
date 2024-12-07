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
          storage: items.Storage?.name || "",
          psu: items.PSU?.name || "",
          casing: items.Casing?.name || "",
          motherboardPrice: items.Motherboard?.price || 0,
          processorPrice: items.Processor?.price || 0,
          ramPrice: items.RAM?.price || 0,
          gpuPrice: items.GPU?.price || 0,
          storagePrice: items.Storage?.price || 0,
          psuPrice: items.PSU?.price || 0,
          casingPrice: items.Casing?.price || 0,
          totalPrice: getTotalPrice(),
        };

         
        try {
          await axios.post("/api/builds", payload).then((res) => {
            // get id from data
            const id = res.data.id;
            const number = 6281381024919
            const message = `Hello, Saya ingin konsultasi untuk pembuatan pc. Ini adalah spek yang akan saya gunakan:
                Processor: ${items.Processor?.name}
                Motherboard: ${items.Motherboard?.name}
                RAM: ${items.RAM?.name}
                GPU: ${items.GPU?.name}
                Storage: ${items.Storage?.name}
                PSU: ${items.PSU?.name}
                Casing: ${items.Casing?.name}
                Total: Rp ${Object.values(items).reduce((acc, curr) => acc + curr.price, 0).toLocaleString()}
                
                Build ID: ${id}
                `; 
                window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank');
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