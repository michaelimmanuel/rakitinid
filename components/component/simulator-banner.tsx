import { Button } from "../ui/button"

export default function SimulatorBanner() {
    return (
        <div className=" snap-center h-svh text-white mt-20  pt-72 mx-auto bg-gradient-to-b from-rakitin-bg to-30% to-black items-center place-content-center relative">
            <div className="flex flex-col items-center bg-[url('/images/simulation-bg.avif')] h-full place-content-center relative before:absolute before:inset-0 before:bg-black before:opacity-80">
                <h1 className="text-4xl font-extrabold text-rakitin-white mb-6 relative z-10">
                    Simulasi Rakitanmu
                </h1>
                <p className="text-lg relative z-10">Rakit PC sesuai kebutuhanmu</p>
                <Button className="mt-5  font-bold bg-rakitin-orange relative z-10">Mulai Simulasi</Button>
            </div>
        </div>
    )
}
