import { Card, CardContent} from "@/components/ui/card"
import ImageStack from "@/components/component/stackedImage";

export default function ProductCard() {
    const data = [
        {
            "title" : "GAMING", 
            "img" : [ 
                "/images/products/gaming-1.jpg",
                "/images/products/gaming-2.jpg",
                "/images/products/gaming-3.jpg",],
            "links" : "/gaming"
        },
        {
            "title" : "WORKSTATION", 
            "img" : [
                "/images/products/workstation.jpg",
                "/images/products/gaming-1.jpg",
                "/images/products/gaming-2.jpg",
                "/images/products/gaming-3.jpg",
                ],
            "links" : "/workstation"
        },
        {
            "title" : "READY TO SHIP", 
            "img" : [
                "/images/products/ready-to-ship.jpg",
                "/images/products/gaming-1.jpg",
                "/images/products/gaming-2.jpg",
                "/images/products/gaming-3.jpg",
                ],
            "links" : "/ready-to-ship",
        },
        {
            "title" : "CUSTOM PC", 
            "img" : [
                "/images/products/gaming-2.jpg",
                "/images/products/gaming-1.jpg",
                "/images/products/ready-to-ship.jpg",
                "/images/products/gaming-3.jpg",
                ],
            "links" : "/custom-pc",
        }
    ]
    return (
        <div>
            <div className="flex flex-col min-width-screen justify-center justify-items-center content-center  bg-rakitin-blue pb-10">
                <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-4  gap-4 p-5">
                    {data.map((item, index) => (
                        <div key={index} className="p-1">
                            <Card className=" bg-rakitin-blue ">
                                <h1 className="text-center text-2xl font-bold text-rakitin-orange mb-5 font-extrabold">{item.title}</h1>
                                <a href={item.links}>
                                    
                                <CardContent className="flex items-center justify-center p-1">
                                    <div className="relative group">
                                        <div className="bg-black opacity-100 z-10 transition-opacity duration-300 group-hover:opacity-20 group-hover:brightness-50 justify-self-center min-w-screen mx-auto rounded-md group-hover:blur-[3px] h-[300px] w-[300px]">
                                            <ImageStack images={item.img} width="300px" height="300px" />
                                        </div>
                                        <div className="absolute bg-black/10 inset-0 opacity-0 group-hover:opacity-100 duration-300 flex items-center justify-center rounded-md ">
                                            <p className="text-rakitin-orange text-3xl font-bold ">Learn More</p>
                                        </div>
                                    </div>
                                </CardContent>
                                </a>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}