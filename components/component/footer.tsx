import LogoGrid from "./logoGrid"

export default function Footer() {
    return (
        <div className="bg-black pb-4">
            <LogoGrid/>


            <div className="flex flex-col bg-black text-white px-20 bg-black ">
                <div className="flex justify-center ">
                    <h1 className="text-xs"> Rakitinlah.id. est. 2020 </h1>
                    
                </div>
                <div className="flex justify-center">
                    <h1 className="text-xs">© 2024 Rakitinlah.id. All rights reserved.</h1>   
                </div>
            </div>
        </div>
    )
}


