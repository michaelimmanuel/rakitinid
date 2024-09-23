import { useState } from 'react';
import Image from "next/image";

interface BrandProps {
    sendBrand: (data: string) => void;
}

export default function ProcessorBrand({ sendBrand }: BrandProps) {
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

    const handleClick = (brand: string) => {
        setSelectedBrand(brand);
        sendBrand(brand);
    };

    return (
        <div className="width-screen">
            <h1 className="text-rakitin-orange pb-10 text-4xl font-extrabold text-center">Processor brand</h1>
            <div className='flex justify-center gap-96'>
                <div 
                    className={`aspect-square rounded-lg bg-white h-36 overflow-hidden flex items-center justify-center text-center ${selectedBrand === 'intel' ? 'border-4 border-rakitin-orange' : ''}`}
                    onClick={() => handleClick('intel')}
                >
                    <Image src='/images/simulasi/intel.png' alt='intel' height={100} width={100}/> 
                </div>
                <div 
                    className={`aspect-square rounded-lg bg-white h-36 overflow-hidden flex items-center justify-center text-center ${selectedBrand === 'amd' ? 'border-4 border-rakitin-orange' : ''}`}
                    onClick={() => handleClick('amd')}
                >
                    <Image src='/images/simulasi/amd.png' alt='amd' height={100} width={100}/> 
                </div>
            </div>
        </div>
    );
}
