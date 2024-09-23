
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
    sendMotherBoard: (data: string) => void;
    motherboards: MotherBoardType[];
}

import { useState } from 'react';

export default function MotherBoard({ motherboards, sendMotherBoard }: MotherBoardProps) {
    const [selectedMotherboardId, setSelectedMotherboardId] = useState<number | null>(null);

    if (!motherboards || motherboards.length === 0) return null;

    const handleClick = (motherboardId: number, motherboardName: string) => {
        if (selectedMotherboardId === motherboardId) {
            setSelectedMotherboardId(null); // Deselect if the same div is clicked again
        } else {
            setSelectedMotherboardId(motherboardId);
        }
        sendMotherBoard(motherboardName);
    };

    return (
        <div className="justify-center">
            <h1 className="text-rakitin-orange text-4xl font-extrabold text-center">Motherboard</h1>
            <div className="flex flex-wrap gap-4 justify-center pt-5">
                {motherboards.map((motherboard) => (
                    (!selectedMotherboardId || selectedMotherboardId === motherboard.id) && (
                        <div
                            key={motherboard.id}
                            className="bg-rakitin-bg rounded-lg shadow-lg p-4 w-80 cursor-pointer"
                            onClick={() => handleClick(motherboard.id, motherboard.name)}
                        >
                            <h1 className="text-rakitin-orange text-xl font-bold">{motherboard.name}</h1>
                            <p className="text-white">${motherboard.price}</p>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}