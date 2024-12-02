"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { Card, CardContent } from "../ui/card";

import Autoplay from 'embla-carousel-autoplay';

const data = [
    {
        "name" : "Charles Widjaja",
        "rating" : 5,
        "comment" : "If you are looking to build / maintain / deep clean / consult, this is the place to go. I live all the way at South Jakarta, my trip to this establishment is TOTALLY WORTH IT"
    },
    {
        "name" : "Gabriel Alexander", 
        "rating" : 5,
        "comment" : "Great for cleaning and troubleshooting your PC, recommended and prices are affordable. The owner is also very honest and great to communicate with 👌"
    },
    {
        "name" : "Vincent Putrandi",
        "rating" : 5,
        "comment" : "Buat yang mau rakit PC,  jangan ragu-ragu buat kesini, hasil rapih, cepat juga, kurang dari 3 jam uda bisa bawa pulang PC yang kita pesan, lalu yg mau build PC tapi ga paham sama spek PCnya, di sini juga bisa konsultasi dan di jelasin rinci sama penjual."
    },
    {
        "name" : "Josephine",
        "rating" : 5,
        "comment" : "mantappp banget! koko nya sangat ramah dan membantu, sabar banget jelasin ke aku yang gatau apa2 ttg pc, terus pas power cable nya ketinggalan di toko, sm kokonya di gosend walaupun rmhnya jauhh hahahaa pokoknya mantap banget dehh recommended banget beli disini!"
    },
    {
        "name" : "Grey Grevorious",
        "rating" : 5,
        "comment" : "Ownernya one man show di rakitinlah, mulai dari selling, consult mengenai PC, brainstorm part yang mau dipake dengan budget yang ada, perakitan PC, dan sampai support / maintenance bisa selalu bantu. Ownernya ramah, dan experience serta knowledgenya juga expert. Overall, experiencenya satisfied bgt mulai dari butuh rekomendasi spec PC di dalem budget sampai PC-nya bisa dipake di rumah. Thank you"
    },
    {
        "name" : "Luhur Prakoso",
        "rating" : 5,
        "comment" : "Menurut saya, di sini pemilik toko berusaha untuk merakitkan pc gaming sesuai budget, item-item yang dibutuhkan supaya masih bisa ada ruang untuk diupgrade nantinya, bergaransi, dan kalau ada pertanyaan - akan dijelaskan dengan baik, ramah, dan tidak tergesa-gesa. Sukses selalu koh Kevin dan tim 👍"
    }
]



export default function CustomerFeedback() {
    return (

        <div className="py-10 bg-gray">
            <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight text-start text-rakitin-white mt-10 mx-20">
                Thousand Of <span className="text-rakitin-orange">Satisfied Customers</span>
            </h1>
            <Carousel
                opts={{
                    align: "start",
                }}
                plugins={[Autoplay({ delay: 3000 })]}
                className="flex justify-center content-center mx-10 my-10 h-full">                
                <CarouselContent className="flex">
                    {data.map((item, index) => (
                        <CarouselItem key={index} className="lg:basis-1/3 md:basis-1/1 sm:basis-1/1 min-h-90 h-full">
                            <Card className="bg-rakitin-light-blue w-full sm:w-full md:w-full lg:w-full h-full">
                                <CardContent className="p-5 sm:p-3 md:p-4 lg:p-5 h-full flex-grow">
                                    <h1 className="text-center text-2xl font-bold text-white">{item.name}</h1>
                                    
                                    <p className="text-justify text-white text-lg mt-5">{item.comment}</p>
                                    <div className="flex items-center justify-left">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <span key={i} className="text-[#FFB81C] mr-1">★</span>
                                        ))}
                                        {[...Array(5 - item.rating)].map((_, i) => (
                                            <span key={i} className="text-[#FFB81C] mr-1">☆</span>
                                        ))}
                                    </div>
                                
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>

            </Carousel>
        </div>

    )
}