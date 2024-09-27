import Card from  './card';
import { useEffect, useState } from 'react';
interface GpuType {
    id: number;
    name: string;
    brand: string;
    memory: string;
    memory_type: string;
    price: number;
    image: string | null;
    createdAt: string;
    updatedAt: string;
}

interface GpuCardProps {
    gpus: GpuType[];
    sendGpuInfo: (data: { name: string; price: number }) => void;
    resetSelectedGpu: boolean;
}

export default function Gpu({ gpus, sendGpuInfo, resetSelectedGpu }: GpuCardProps) {
    const [selectedGpuId, setSelectedGpuId] = useState<number | null>(null);

    useEffect(() => {
        if (resetSelectedGpu) {
            setSelectedGpuId(null);
        }
    }, [resetSelectedGpu]);

    if (!gpus || gpus.length === 0) return null;

    const handleClick = (gpuId: number, name: string, price: number) => {
        if (selectedGpuId === gpuId) {
            setSelectedGpuId(null);
        } else {
            setSelectedGpuId(gpuId);
        }
        sendGpuInfo({ name, price });
    };

    return (
        <div className="justify-center">
            <h1 className="text-rakitin-orange text-4xl font-extrabold text-center">GPU</h1>
            <div className="flex flex-wrap gap-4 justify-center pt-5">
                {gpus.map((gpu) => (
                    (!selectedGpuId || selectedGpuId === gpu.id) && (
                        <Card
                            key={gpu.id}
                            name={gpu.name}
                            price={gpu.price}
                            image={gpu.image}
                            isSelected={selectedGpuId === gpu.id}
                            onClick={() => handleClick(gpu.id, gpu.name, gpu.price)}
                        />
                    )
                ))}
            </div>
        </div>
    );
}