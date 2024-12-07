import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

import { useState, useEffect } from "react";
import axios from "axios";

interface CasingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sendDataToParent: (data: { name: string; price: number }) => void;
  itemName: string;
}

export default function CasingDialog({ isOpen, onClose, sendDataToParent, itemName }: CasingDialogProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSelectCasing = (casing: { name: string; price: number }) => {
    
    sendDataToParent(casing);
    onClose();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/casing`);
      setItems(response.data);
    } catch (error) {
      console.error(`Failed to fetch data for Casing:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black max-h-[80%] max-w-[90%] h-full w-full">
        <DialogHeader className="space-y-0 h-fit max-h-fit pb-5">
            <DialogTitle>Pick Your Casing</DialogTitle>
        </DialogHeader>
        {loading ? (
          <p>Loading Casing...</p>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-scroll pt-4">
            {items.map((item) => (
              <Card key={item.id} className="" onClick={() => handleSelectCasing(item)}>
                <div className="relative pt-[75%]">
                  <Image
                    src={item.image || "/images/fallback-img.png"} // Use fallback image if item.image is invalid
                    alt={item.name || "Casing Image"}
                    fill
                    sizes="(max-width: 1000px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                  <p className="text-gray-600">Rp {item.price.toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No Casing available</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
