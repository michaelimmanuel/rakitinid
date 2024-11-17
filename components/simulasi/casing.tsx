import {useState, useEffect} from 'react';
import Card from './card';

interface CasingType {
    id: number;
    name: string;
    brand: string;
    type: string;
    price: number;
    image: string | null;
    createdAt: string;
    updatedAt: string;
}

interface CasingCardProps {
    casings: CasingType[];
    sendCasingInfo: (data: { name: string; price: number }) => void;
    resetSelectedCasing: boolean;
}

export default function Casing({ casings, sendCasingInfo, resetSelectedCasing }: CasingCardProps) {
    const [selectedCasingId, setSelectedCasingId] = useState<number | null>(null);

    useEffect(() => {
        if (resetSelectedCasing) {
            setSelectedCasingId(null);
        }
    }, [resetSelectedCasing]);

    if (!casings || casings.length === 0) return null;

    const handleClick = (casingId: number, name: string, price: number) => {
        if (selectedCasingId === casingId) {
            setSelectedCasingId(null);
        } else {
            setSelectedCasingId(casingId);
        }
        sendCasingInfo({ name, price });
    };

    return (
        <div className="justify-center">
            <h1 className="text-rakitin-orange text-4xl font-extrabold text-center">Casing</h1>
            <div className="flex flex-wrap gap-4 justify-center pt-5">
                {casings.map((casing) => (
                    (!selectedCasingId || selectedCasingId === casing.id) && (
                        <Card
                            key={casing.id}
                            name={casing.name}
                            price={casing.price}
                            image={casing.image}
                            isSelected={selectedCasingId === casing.id}
                            onClick={() => handleClick(casing.id, casing.name, casing.price)}
                        />
                    )
                ))}
            </div>
        </div>
    );
}