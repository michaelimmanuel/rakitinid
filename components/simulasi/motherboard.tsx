import { useState, useEffect } from 'react';
import Card from './card';  

interface MotherBoardType {
  id: number;
  name: string;
  brand: string;
  socket_type_id: number;
  form_factor: string;
  supported_memory_type: string;
  price: number;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

interface MotherBoardProps {
  sendMotherBoard: (data: { formFactor: string; name: string; price: number; memory_type: string }) => void;
  motherboards: MotherBoardType[];
  resetSelectedProcessor: boolean;
}

export default function MotherBoard({ motherboards, sendMotherBoard, resetSelectedProcessor }: MotherBoardProps) {
  const [selectedMotherboardId, setSelectedMotherboardId] = useState<number | null>(null);

  useEffect(() => {
    if (resetSelectedProcessor) {
      setSelectedMotherboardId(null);
    }
  }, [resetSelectedProcessor]);

  if (!motherboards || motherboards.length === 0) return null;

  const handleClick = (motherboardId: number, formFactor: string, name: string, price: number, memory_type: string) => {
    if (selectedMotherboardId === motherboardId) {
      setSelectedMotherboardId(null);
    } else {
      setSelectedMotherboardId(motherboardId);
    }
    sendMotherBoard({ formFactor, name, price, memory_type });
  };

  return (
    <div className="justify-center">
      <h1 className="text-rakitin-orange text-4xl font-extrabold text-center">Motherboard</h1>
      <div className="flex flex-wrap gap-4 justify-center pt-5">
        {motherboards.map((motherboard) => (
          (!selectedMotherboardId || selectedMotherboardId === motherboard.id) && (
          <Card
            key={motherboard.id}
            name={motherboard.name}
            price={motherboard.price}
            image={motherboard.image}
            isSelected={selectedMotherboardId === motherboard.id}
            onClick={() => handleClick(motherboard.id, motherboard.form_factor, motherboard.name, motherboard.price, motherboard.supported_memory_type)}
          />
          )
        ))}
      </div>
    </div>
  );
}
