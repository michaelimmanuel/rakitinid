import ImageStack from "@/components/component/stackedImage";



const imageUrls: string[] = [
    "/images/products/gaming-1.jpg",
    "/images/products/gaming-2.jpg",
    "/images/products/gaming-3.jpg",
];
export default function Test() {
    return (
     
            <div>
                <ImageStack images={imageUrls} />
            </div>
        
    );
}
