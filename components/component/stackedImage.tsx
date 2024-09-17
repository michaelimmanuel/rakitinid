import { Card, CardContent } from "@/components/ui/card";

interface ImageStackProps {
    images: string[]; 
    width?: string;
    height?: string;
}

const ImageStack: React.FC<ImageStackProps> = ({ images, width = "300px", height = "300px" }) => {
    return (
        <div className="relative flex justify-center items-center hover:scale-105 transition-transform duration-300 ease-in-out" style={{ width, height }}>
            {images.map((img, index) => (
                <Card
                    key={index}
                    className={`absolute shadow-2xl rounded-lg transition-all duration-500 ease-in-out transform-gpu`}
                    style={{
                        width: width,
                        height: height,
                        zIndex: 10 - index, 
                        transform: `translate(${index * 10}px, ${index * 10}px)`
 
                    }}
                >
                    <CardContent className="relative p-0 m-0 overflow-hidden h-full">
                        <div
                            className="absolute inset-0 bg-black"
                            style={{ opacity: (index + 1) * 0.2 }}
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
