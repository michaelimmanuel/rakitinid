import {useEffect, useState} from 'react';
import Card from './card';

interface storageType {
    id: number;
    name: string;
    brand: string;
    capacity: string;
    storage_type: string;
    price: number;
    image: string | null;
    createdAt: string;
    updatedAt: string;
}

interface StorageCardProps {
    storage: storageType[];
    sendStorageInfo: (data: { name: string; price: number }) => void;
    resetSelectedStorage: boolean;
}

export default function Storage({ storage, sendStorageInfo, resetSelectedStorage }: StorageCardProps) {
    const [selectedStorageId, setSelectedStorageId] = useState<number | null>(null);

    useEffect(() => {
        if (resetSelectedStorage) {
            setSelectedStorageId(null);
        }
    }, [resetSelectedStorage]);

    if (!storage || storage.length === 0) return null;

    const handleClick = (storageId: number, name: string, price: number) => {
        if (selectedStorageId === storageId) {
            setSelectedStorageId(null);
        } else {
            setSelectedStorageId(storageId);
        }
        sendStorageInfo({ name, price });
    };

    return (
        <div className="justify-center">
            <h1 className="text-rakitin-orange text-4xl font-extrabold text-center">Storage</h1>
            <div className="flex flex-wrap gap-4 justify-center pt-5">
                {storage.map((storage) => (
                    (!selectedStorageId || selectedStorageId === storage.id) && (
                        <Card
                            key={storage.id}
                            name={storage.name}
                            price={storage.price}
                            image={storage.image}
                            isSelected={selectedStorageId === storage.id}
                            onClick={() => handleClick(storage.id, storage.name, storage.price)}
                        />
                    )
                ))}
            </div>
        </div>
    );
}