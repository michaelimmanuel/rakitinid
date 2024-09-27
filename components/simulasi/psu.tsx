import {useState, useEffect} from 'react';
import Card from './card';

interface PsuType {
    id: number;
    name: string;
    brand: string;
    wattage: string;
    price: number;
    image: string | null;
    createdAt: string;
    updatedAt: string;
}

interface PsuCardProps {
    psus: PsuType[];
    sendPsuInfo: (data: { name: string; price: number }) => void;
    resetSelectedPsu: boolean;
}

export default function Psu({ psus, sendPsuInfo, resetSelectedPsu }: PsuCardProps) {
    const [selectedPsuId, setSelectedPsuId] = useState<number | null>(null);

    useEffect(() => {
        if (resetSelectedPsu) {
            setSelectedPsuId(null);
        }
    }, [resetSelectedPsu]);

    if (!psus || psus.length === 0) return null;

    const handleClick = (psuId: number, name: string, price: number) => {
        if (selectedPsuId === psuId) {
            setSelectedPsuId(null);
        } else {
            setSelectedPsuId(psuId);
        }
        sendPsuInfo({ name, price });
    };

    return (
        <div className="justify-center">
            <h1 className="text-rakitin-orange text-4xl font-extrabold text-center">PSU</h1>
            <div className="flex flex-wrap gap-4 justify-center pt-5">
                {psus.map((psu) => (
                    (!selectedPsuId || selectedPsuId === psu.id) && (
                        <Card
                            key={psu.id}
                            name={psu.name}
                            price={psu.price}
                            image={psu.image}
                            isSelected={selectedPsuId === psu.id}
                            onClick={() => handleClick(psu.id, psu.name, psu.price)}
                        />
                    )
                ))}
            </div>
        </div>
    );
}