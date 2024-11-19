export default function Service(){
    return (
        <div   className="flex flex-col items-center justify-center block py-10 mt-5">
            <h1 className="scroll-m-20 text-3xl font-extrabold text-rakitin-orange tracking-tight lg:text-5xl inline-block">
                Services
            </h1>
            <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-4 p-5">
                <div className="p-1 h-36 w-36 bg-red justify-center text-center ">
                    <h1 className="align-middle ">Build</h1>
                </div>
                <div className="p-1">
                    <h1>Upgrade</h1>
                </div>
                <div className="p-1">
                    <h1>Maintenance</h1>
                </div>
            </div>
      </div>
        )
}