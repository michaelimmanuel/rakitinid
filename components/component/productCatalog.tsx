import { Card, CardContent} from "@/components/ui/card"


export default function ProductCard() {
    const data = [
        {
            "title" : "GAMING", 
            "img" : "https://placehold.co/300x300",
            "links" : "/gaming"
        },
        {
            "title" : "WORKSTATION", 
            "img" : "https://placehold.co/300x300",
            "links" : "/workstation"
        },
        {
            "title" : "READY TO SHIP", 
            "img" : "https://placehold.co/300x300",
            "links" : "/ready-to-ship"
        },
    ]
    return (
        <div>
            <div className="flex flex-col min-width-screen justify-center justify-items-center content-center bg-rakitin-bg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
                    {data.map((item, index) => (
                        <div key={index} className="p-1">
                            <Card className="bg-rakitin-bg ">
                                <h1 className="text-center text-2xl font-bold text-white mb-5">{item.title}</h1>
                                <a href={item.links}>
                                    
                                <CardContent className="flex items-center justify-center p-1">
                                    <div className="relative group">
                                        <img className=" bg-black opacity-100 z-10 transition-opacity duration-300 group-hover:opacity-20 group-hover:brightness-50 justify-self-center min-w-screen mx-auto rounded-md group-hover:blur-[3px]" src={item.img} alt="" />
                                    
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