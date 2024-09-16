import LogoGrid from "./logoGrid"

export default function Footer() {
    return (
        <div className="bg-black">
            <LogoGrid/>
            <div className="flex flex-col bg-black text-white px-20 py-3 bg-black mt-5">
                <div className="flex justify-center p-5">
                    <p className="text-xs">© 2024 Rakitinlah.id. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}
