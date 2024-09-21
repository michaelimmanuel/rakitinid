import { Button } from "../ui/button"

export default function SimulatorBanner() {
    return (
        <div className=" snap-center h-svh text-white mt-20  pt-72 mx-auto bg-gradient-to-b from-rakitin-bg to-30% to-black items-center place-content-center relative">
            <div className="flex flex-col items-center bg-[url('/images/simulation-bg.avif')] h-full place-content-center relative before:absolute before:inset-0 before:bg-black before:opacity-70">
                <h1 className="text-xl font-extrabold text-rakitin-white relative z-10 uppercase sm:text-2xl">
                    Want more power?
                </h1>
                <Button className="mt-10 text-white text-xl font-bold bg-rakitin-orange relative z-10 h-16 ">Customize Your PC</Button>
            </div>
        </div>
    )
}
