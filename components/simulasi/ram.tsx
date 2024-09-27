import { useState, useEffect } from 'react';


interface ramType {
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
    rams: ramType[];
    sendRamInfo: (data:{name : string, price:number}) => void;
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

    const handleClick = (ramId: number, name : string, price : number) => {
        if (selectedRamId === ramId) {
            setSelectedRamId(null); // Deselect if the same div is clicked again
        } else {
            setSelectedRamId(ramId);
        }
        sendRamInfo({name, price});
    }

    return (
        <div className="justify-center">
            <h1 className="text-rakitin-orange text-4xl font-extrabold text-center">Ram</h1>
            <div className="flex flex-wrap gap-4 justify-center pt-5">
                {rams.map((ram) => (
                    (!selectedRamId || selectedRamId === ram.id) && (

                        <div
                            key={ram.id}
                            className="bg-rakitin-bg rounded-lg shadow-lg p-4 w-80 cursor-pointer"
                            onClick={() => handleClick(ram.id, ram.name, ram.price)}
                        >
                            <h1 className="text-rakitin-orange text-xl font-bold">{ram.name}</h1>
                            <p className="text-white">${ram.price}</p>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}