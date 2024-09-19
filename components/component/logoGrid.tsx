import Image from "next/image"

export default function LogoGrid() {
    return (
        // make a grid of gaming brands logo
        <div className="flex flex-col bg-black text-white py-3 bg-black items-center">
            <div className="grid grid-cols-3 gap-4 p-5">
                <div className="p-1 flex justify-center items-center">
                    <Image src="/images/msi-logo.png" alt="acer logo" width={200} height={200} />
                </div>
                <div className="p-1 flex justify-center items-center">
                    <Image src="/images/nvidia-logo.png" alt="" width={200} height={200} />
                </div>
                <div className="p-1 flex justify-center items-center">
                    <Image src="/images/rog-logo.png" alt="" width={200} height={200} />
                </div>
            </div>
        </div>
    )
}