import Image from "next/image";

interface BrandProps {
    sendBrand: (data: string) => void;
}

export default function Processor({ sendBrand }: BrandProps) {
    return (
        <div className='flex justify-center gap-96'>
            <div 
                className='aspect-square rounded-lg bg-white h-36 overflow-hidden flex items-center justify-center'
                onClick={() => sendBrand('intel')}
            >
              <Image src='/images/simulasi/intel.png' alt='intel' height={100} width={100}/> 
            </div>
            <div 
                className='aspect-square rounded-lg bg-white h-36 overflow-hidden flex items-center justify-center'
                onClick={() => sendBrand('amd')}
            >
              <Image src='/images/simulasi/amd.png' alt='intel' height={100} width={100}/> 
            </div>
        </div>
    );
}
