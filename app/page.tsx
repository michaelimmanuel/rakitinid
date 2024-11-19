"use client";
import CarouselComponent from "@/components/component/banner";
import ProductCard from "@/components/component/productCatalog";
import CustomerFeedback from "@/components/component/customerFeedback";
import SimulatorBanner from "@/components/component/simulator-banner";
import Service from "@/components/component/services";
export default function Home() {
  return (
    <div>
      
      <div className="pt-5 justify-center h-96  lg:h-[80vh] mx-auto bg-gradient-to-b from-80% from-black">
        <CarouselComponent/>
      </div>
      
      <div   className="flex flex-col items-center justify-center block py-10 mt-5">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl inline-block">
          Build Your <span className="text-rakitin-orange">Dream</span> PC
        </h1>
      </div>

      <div className="flex flex-col min-width-screen bg-indigo-900 justify-center justify-items-center content-center	">
        
      </div>

      <ProductCard/>

      <Service/>

      <CustomerFeedback/>

      <div id="simulation">
        <SimulatorBanner />
      </div>
    
    </div>


    );
}
