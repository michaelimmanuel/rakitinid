"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";

interface ItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string; // Used to fetch data dynamically
  sendDataToParent: (data: { name: string; price: number, socketId?:string }) => void; // Callback to send selected item
  socketId?: string | null;
}

export function ItemDialog({ isOpen, onClose, itemName, sendDataToParent, socketId }: ItemDialogProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (itemName.toLowerCase() === "motherboard" && !socketId) {
        setErrorMessage("Please select a processor first.");
        setItems([]);
        setLoading(false);
      } else {
        setErrorMessage(null);
        fetchData(itemName);
      }
    }
  }, [isOpen, itemName, socketId]);

  const fetchData = async (name: string) => {
    setLoading(true);
    try {
      if (name.toLowerCase() === "motherboard") {
        const response = await axios.get(`/api/motherboard/${socketId}`); // Assuming endpoint matches item name
        setItems(response.data);
      } else if (/^fan/i.test(name)) {
        const response = await axios.get(`/api/fan`);
        setItems(response.data);
      } else if(/^accessories/i.test(name)){
        const response = await axios.get(`/api/accessories`);
        setItems(response.data);
      } else if(/^storage/i.test(name)){
        const response = await axios.get(`/api/storage`);
        setItems(response.data);
        
      }else {
        const response = await axios.get(`/api/${name.toLowerCase()}`); // Assuming endpoint matches item name
        setItems(response.data);
      }
    } catch (error) {
      console.error(`Failed to fetch data for ${name}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item: { name: string; price: number }) => {
    sendDataToParent(item); // Pass selected item back to the parent
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black w-7xl">
        <DialogHeader>
          <DialogTitle>Pick Your {itemName}</DialogTitle>
        </DialogHeader>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : loading ? (
          <p>Loading {itemName}...</p>
        ) : items.length > 0 ? (
          <ul className="space-y-4 overflow-y-auto max-h-96">
            {items.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 border rounded-lg cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                    onClick={() => handleSelect(item)}
                  >
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-gray-500">Price: Rp {item.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <img src={item.image} alt={item.name} className="max-w-[50px] max-h-[50px]" />
                    </div>
                  </li>
            ))}
          </ul>
        ) : (
          <p>No items found for {itemName}.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
