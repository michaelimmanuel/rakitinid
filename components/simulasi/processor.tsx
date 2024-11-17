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
        <div className="w-full px-4">
            <h1 className="text-rakitin-orange pb-10 text-4xl font-extrabold text-center">
                Processor Brand
            </h1>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                {/* Intel Button */}
                <div
                    className={`aspect-square rounded-lg bg-white w-28 md:w-36 overflow-hidden flex items-center justify-center text-center cursor-pointer ${
                        selectedBrand === 'intel' ? 'border-4 border-rakitin-orange' : ''
                    }`}
                    onClick={() => handleClick('intel')}
                >
                    <Image src="/images/simulasi/intel.png" alt="intel" height={100} width={100} />
                </div>

                {/* AMD Button */}
                <div
                    className={`aspect-square rounded-lg bg-white w-28 md:w-36 overflow-hidden flex items-center justify-center text-center cursor-pointer ${
                        selectedBrand === 'amd' ? 'border-4 border-rakitin-orange' : ''
                    }`}
                    onClick={() => handleClick('amd')}
                >
                    <Image src="/images/simulasi/amd.png" alt="amd" height={100} width={100} />
                </div>
            </div>
        </div>
    );
}
