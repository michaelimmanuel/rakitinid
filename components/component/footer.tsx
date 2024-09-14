

export default function Footer() {
    return (
        <div>
            <div className="flex flex-col bg-rakitin-bg text-white px-20 py-3 bg-black mt-20">
                <div className="flex flex-col md:flex-row justify-around items-center p-5">
                    <div className="flex flex-col items-left">
                        <h1 className="text-2xl font-bold">Rakitinlah.id</h1>
                        <p className="text-sm">Jl. Kebon Jeruk No. 5, Jakarta Barat</p>
                        <p className="text-sm">+62 812 3456 7890</p>
                        <p className="text-sm">
                            <a href="mailto:" className="text-rakitin-orange"> rakitin@gmail.com </a>
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <h1 className="text-2xl font-bold">Follow Us</h1>
                        <p className="text-sm">Instagram</p>
                        <p className="text-sm">Facebook</p>
                        <p className="text-sm">Twitter</p>
                    </div>
                </div>
                <div className="flex justify-center p-5">
                    <p className="text-sm">© 2024 Rakitinlah.id. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}
