


import { useState } from 'react';

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
    onSocketTypeSelect: (socketTypeId: number) => void;
}

export default function ProcessorCard({ processors, onSocketTypeSelect }: ProcessorCardProps) {
    const [selectedProcessorId, setSelectedProcessorId] = useState<number | null>(null);

    if (!processors || processors.length === 0) return null;

    const handleClick = (socketTypeId: number, processorId: number) => {
        if (selectedProcessorId === processorId) {
            setSelectedProcessorId(null); // Deselect if the same div is clicked again
        } else {
            setSelectedProcessorId(processorId);
        }
        onSocketTypeSelect(socketTypeId);
    };

    return (
        <div className="justify-center">
            <h1 className="text-rakitin-orange text-4xl font-extrabold text-center">Processor</h1>
            <div className="flex flex-wrap gap-4 justify-center pt-5">
                {processors.map((processor) => (
                    (!selectedProcessorId || selectedProcessorId === processor.id) && (
                        <div
                            key={processor.id}
                            className="bg-rakitin-bg rounded-lg shadow-lg p-4 w-80 cursor-pointer"
                            onClick={() => handleClick(processor.socket_type_id, processor.id)}
                        >
                            <h1 className="text-rakitin-orange text-xl font-bold">{processor.name}</h1>
                            <p className="text-white">${processor.price}</p>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}