import { useState, useEffect } from 'react';
import Card from './card';

interface RamType {
    id: number;
    name: string;
    brand: string;
    memory_type: string;
    memory_speed: string;
    price: number;
    image: string | null;
    createdAt: string;
    updatedAt: string;
}

interface RamProps {
    rams: RamType[];
    sendRamInfo: (data: { name: string; price: number }) => void;
    resetSelectedRam: boolean;
}

export default function Ram({ rams, sendRamInfo, resetSelectedRam }: RamProps) {
    const [selectedRamId, setSelectedRamId] = useState<number | null>(null);

    useEffect(() => {
        if (resetSelectedRam) {
            setSelectedRamId(null);
        }
    }, [resetSelectedRam]);

    if (!rams || rams.length === 0) return null;

    const handleClick = (ramId: number, name: string, price: number) => {
        if (selectedRamId === ramId) {
            setSelectedRamId(null); // Deselect if the same RAM is clicked again
        } else {
            setSelectedRamId(ramId);
        }
        sendRamInfo({ name, price });
    };

    return (
        <div className="justify-center">
            <h1 className="text-rakitin-orange text-4xl font-extrabold text-center">RAM</h1>
            <div className="flex flex-wrap gap-4 justify-center pt-5">
                {rams.map((ram) => (
                    (!selectedRamId || selectedRamId === ram.id) && (
                        <Card
                            key={ram.id}
                            name={ram.name}
                            price={ram.price}
                            image={ram.image}
                            isSelected={selectedRamId === ram.id}
                            onClick={() => handleClick(ram.id, ram.name, ram.price)}
                        />
                    )
                ))}
            </div>
        </div>
    );
}
