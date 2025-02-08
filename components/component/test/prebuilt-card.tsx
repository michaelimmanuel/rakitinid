import Image from 'next/image';
import { Card } from '@/components/ui/card';

export default function PrebuildCard(image : {src: string, alt: string, title:string, price:number}, ) {
    return (
        <div className="p-1 mx-2">
            <Card className="bg-[#36343A]">
                <h1 className="text-lg font-semibold text-center mb-4">{image.title}</h1>
                <Image
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={300}
                    className="aspect-[4/4] w-full max-w-[400px] object-cover transition-all mx-auto"
                    quality={100}
                />
                <div className="p-4 mt-4 text-center">
                    
                    <p className="text-sm text-gray-300">Rp {image.price.toLocaleString()}</p>
                    
                </div>
            </Card>
        </div>
    );
}