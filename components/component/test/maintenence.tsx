import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  import Image from 'next/image'
const Maintenence = () => {
  return (
    <div className="my-28 px-6 lg:px-20">
            <div className="text-center text-white">
                <h1 className="text-white text-xl lg:text-3xl text-center font-bold mt-10">PC Maintenance Package</h1>
            </div>
            <div className="text-white text-left mt-10">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="accordion1" className="border-white/20">
                        <AccordionTrigger className="text-xl font-semibold [&[data-state=open]>svg]:rotate-180 [&>svg]:text-white">
                            <div className="flex justify-between w-full">
                                <div className=" pr-4 ">
                                    Ultimate Package Cleaning ATX - MATX
                                </div>
                                <div className=" pl-4 mr-4 font-extrabold underline text-rakitin-orange">
                                    400K
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-white/90 capitalize">
                            <div>
                                cuci detailing casing, bongkar total, detailing component, thermal paste premium, rakit ulang
                            </div>
                            <div className="flex lg:flex-row flex-col justify-around gap-4 mt-4 ">
                                <div className="flex gap-4 justify-around">
                                    <Image src="/ultimate/1-before.jpg" width={150} height={150} alt='paket ultimate'/>
                                    <Image src="/ultimate/1-after.jpg"  width={150} height={150} alt='paket ultimate'/>
                                </div>
                                <div className="flex gap-4 justify-around">
                                    <Image src="/ultimate/2-before.jpg" width={150} height={150} alt='paket ultimate'/>
                                    <Image src="/ultimate/2-after.jpg"  width={150} height={150} alt='paket ultimate'/>
                                </div>
                                <div className="flex gap-4 justify-around">
                                    <Image src="/ultimate/3-before.jpg" width={150} height={150} alt='paket ultimate'/>
                                    <Image src="/ultimate/3-after.jpg"  width={150} height={150} alt='paket ultimate'/>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="accordion2" className="border-white/20">
                        <AccordionTrigger className="text-xl font-semibold [&[data-state=open]>svg]:rotate-180 [&>svg]:text-white">
                        
                            <div className="flex justify-between w-full">
                                <div className=" pr-4">
                                    Gold Package Cleaning ATX - MATX
                                </div>
                                <div className=" pl-4 mr-4 font-extrabold underline text-rakitin-orange">
                                    300K
                                </div>
                        </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-white/90 capitalize">
                            <div>
                                cleaning casing, bongkar total, cleaning component, thermal paste premium, rakit ulang

                            </div>
                            <div className="flex lg:flex-row flex-col justify-around gap-4 mt-4 ">
                                <div className="flex gap-4 justify-around">
                                    <Image src="/gold/1-before.jpg" width={150} height={150} alt='paket gold'/>
                                    <Image src="/gold/1-after.jpg"  width={150} height={150} alt='paket gold'/>
                                </div>
                                <div className="flex gap-4 justify-around">
                                    <Image src="/gold/2-before.jpg" width={150} height={150} alt='paket gold'/>
                                    <Image src="/gold/2-after.jpg"  width={150} height={150} alt='paket gold'/>
                                </div>
                                <div className="flex gap-4 justify-around">
                                    <Image src="/gold/3-before.jpg" width={150} height={150} alt='paket gold'/>
                                    <Image src="/gold/3-after.jpg"  width={150} height={150} alt='paket gold'/>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="accordion3" className="border-white/20">
                        <AccordionTrigger className="text-xl font-semibold [&[data-state=open]>svg]:rotate-180 [&>svg]:text-white">
                            <div className="flex justify-between w-full">
                                <div className=" pr-4">
                                    Silver Package Cleaning ATX - MATX
                                </div>
                                <div className=" pl-4 mr-4 font-extrabold underline text-rakitin-orange">
                                    175K
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-white/90 capitalize">
                            <div>
                                Repasta CPU & Cleaning component (dusting) - more detailed -

                            </div>
                            <div className="flex flex-row justify-around gap-4 mt-4">
                                <div className="flex gap-4 justify-around">
                                        <Image src="/silver/1-before.jpg" width={150} height={150} alt='paket silver'/>
                                        <Image src="/silver/1-after.jpg"  width={150} height={150} alt='paket silver'/>
                                </div>
                                <div className="flex gap-4 justify-around">
                                    <Image src="/silver/2-before.jpg" width={150} height={150} alt='paket silver'/>
                                    <Image src="/silver/2-after.jpg"  width={150} height={150} alt='paket silver'/>
                                </div>
                                <div className="flex gap-4 justify-around">
                                    <Image src="/silver/3-before.jpg" width={150} height={150} alt='paket silver'/>
                                    <Image src="/silver/3-after.jpg"  width={150} height={150} alt='paket silver'/>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="accordion4" className="border-white/20">
                        <AccordionTrigger className="text-xl font-semibold [&[data-state=open]>svg]:rotate-180 [&>svg]:text-white">
                            <div className="flex justify-between w-full">
                                <div className=" pr-4">
                                    Bronze Package Cleaning
                                </div>
                                <div className="pl-4 mr-4 font-extrabold underline text-rakitin-orange">
                                    125K
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-white/90 capitalize">
                            <div>
                                Repasta CPU & Cleaning component (dusting)

                            </div>
                            <div className="flex flex-row justify-around gap-4 mt-4">
                                <div className="flex gap-4 justify-around">
                                        <Image src="/bronze/1-before.jpg" width={150} height={150} alt='paket bronze'/>
                                        <Image src="/bronze/1-after.jpg"  width={150} height={150} alt='paket bronze'/>
                                </div>
                                <div className="flex gap-4 justify-around">
                                    <Image src="/bronze/2-before.jpg" width={150} height={150} alt='paket bronze'/>
                                    <Image src="/bronze/2-after.jpg"  width={150} height={150} alt='paket bronze'/>
                                </div>
                                <div className="flex gap-4 justify-around">
                                    <Image src="/bronze/3-before.jpg" width={150} height={150} alt='paket bronze'/>
                                    <Image src="/bronze/3-after.jpg"  width={150} height={150} alt='paket bronze'/>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

        </div>
  )
}

export default Maintenence