import { useState, useEffect } from 'react';
import Card from './card';

interface ProcessorType {
  id: number;
  name: string;
  brand: string;
  socket_type_id: number;
  price: number;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ProcessorCardProps {
  processors: ProcessorType[];
  sendProcessorInfo: (data: { socket_type_id: number; name: string; price: number }) => void;
  resetSelectedProcessor: boolean;
}

export default function ProcessorCard({ processors, sendProcessorInfo, resetSelectedProcessor }: ProcessorCardProps) {
  const [selectedProcessorId, setSelectedProcessorId] = useState<number | null>(null);

  useEffect(() => {
    if (resetSelectedProcessor) {
      setSelectedProcessorId(null);
    }
  }, [resetSelectedProcessor]);

  if (!processors || processors.length === 0) return null;

  const handleClick = (socketTypeId: number, processorId: number, name: string, price: number) => {
    if (selectedProcessorId === processorId) {
      setSelectedProcessorId(null); 
    } else {
      setSelectedProcessorId(processorId);
    }
    sendProcessorInfo({ socket_type_id: socketTypeId, name, price });
  };

  return (
    <div className="justify-center">
      <h1 className="text-rakitin-orange text-4xl font-extrabold text-center">Processor</h1>
      <div className="flex flex-wrap gap-4 justify-center pt-5">
        {processors.map((processor) => (
            (!selectedProcessorId || selectedProcessorId === processor.id) && (
                <Card
                    key={processor.id}
                    name={processor.name}
                    price={processor.price}
                    image={processor.image}
                    isSelected={selectedProcessorId === processor.id}
                    onClick={() => handleClick(processor.socket_type_id, processor.id, processor.name, processor.price)}
                />
            )
        ))}
      </div>
    </div>
  );
}
