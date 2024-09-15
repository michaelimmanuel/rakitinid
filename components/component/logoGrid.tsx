

export default function LogoGrid() {
    return (
        // make a grid of gaming brands logo
        <div className="flex flex-col bg-black text-white px-20 py-3 bg-black mt-20 items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
                <div className="p-1">
                    <img className=" h-40" src="/images/msi-logo.png" alt="" />
                </div>
                <div className="p-1">
                    <img className=" h-40" src="/images/nvidia-logo.png" alt="" />
                </div>
                <div className="p-1">
                    <img className=" h-40" src="/images/rog-logo.png" alt="" />
                </div>
            </div>
        </div>
    )
}