import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PrebuiltItem {
    isOpen: boolean;
    onClose: () => void;
    item: {
        coverImage: string;
        name: string;
        price: number;
        description: string;
    } | null;
}

const contactWa = (name: string) => {
    const message = `Hai min, saya mau beli prebuilt pc ${name}`;
    const url = `https://wa.me/6281381024919?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
};


export default function PrebuiltDetails({ isOpen, onClose, item }: PrebuiltItem) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl w-full p-6 rounded-lg bg-rakitin-bg text-white">
                {item ? (
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left Side: Image */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <Image
                                src={item.coverImage}
                                alt={item.name}
                                width={300}
                                height={300}
                                className="rounded-lg object-cover"
                            />
                        </div>

                        {/* Right Side: Details */}
                        <div className="w-full md:w-1/2 flex flex-col justify-between">
                            <div>
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold flex justify-between items-center">
                                        <span>{item.name}</span>
                                        <span className="text-lg font-semibold text-green-600">
                                            Rp. {item.price.toLocaleString()}
                                        </span>
                                    </DialogTitle>
                                </DialogHeader>
                                <p className="text-gray-400 mt-4">{item.description}</p>
                            </div>

                            <Button className="mt-6 w-full bg-rakitin-orange hover:bg-blue-700 text-white font-semibold py-2 rounded-lg" onClick={ () => contactWa(item.name)}>
                                Buy Now
                            </Button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">Loading...</p>
                )}
            </DialogContent>
        </Dialog>
    );
}
