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

  useEffect(() => {
    if (isOpen) {
      fetchData(itemName);
    }
  }, [isOpen, itemName]);

  const fetchData = async (name: string) => {
    setLoading(true);
    try {

      if(name === "Motherboard"){
        const response = await axios.get(`/api/motherboard/${socketId}`); // Assuming endpoint matches item name
        setItems(response.data);
      }  else {
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
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Pick Your {itemName}</DialogTitle>
        </DialogHeader>
        {loading ? (
          <p>Loading {itemName}...</p>
        ) : items.length > 0 ? (
          <ul className="space-y-4 overflow-y-auto max-h-96">
            {items.map((item, index) => (
              <li
                key={index}
                className="p-2 border rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(item)}
              >
                <p className="font-bold">{item.name}</p>
                <p className="text-gray-500">Price: Rp {item.price.toLocaleString()}</p>
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
