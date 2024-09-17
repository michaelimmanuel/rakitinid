import { Card, CardContent } from "@/components/ui/card";


interface ImageStackProps {
    images: string[]; 
}


const ImageStack: React.FC<ImageStackProps> = ({ images }) => {
    return (
        <div className="relative flex justify-center items-center w-full h-screen">
            {images.map((img, index) => (
                <Card
                    key={index}
                    className={`absolute w-[500px] h-[500px] shadow-lg rounded-lg ${
                        `z-${100 - index}` 
                    }`}
                    style={{
                        transform: `translate(${index * 10}px, ${index * 10}px)`, 
                    }}
                >
                    <CardContent className="relative p-0 m-0 overflow-hidden h-full">
                        
                        <div
                            className="absolute inset-0 bg-black"
                            style={{ opacity: (images.length - index) * 0.2 }} 
                        ></div>

                        <img
                            src={img}
                            alt={`Image ${index + 1}`}
                            className="object-cover w-full h-full"
                        />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ImageStack;
