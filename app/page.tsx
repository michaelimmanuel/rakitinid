
import CarouselComponent from "@/components/component/banner";
import ProductCard from "@/components/component/productCatalog";

export default function Home() {
  return (
    <div>
      
      <div className="pt-5 justify-center content-center mx-auto">
        <CarouselComponent/>
      </div>
      
      <div className="flex flex-col h-72 items-center justify-end block py-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl inline-block">
          Build Your <span className="text-rakitin-orange">Dream</span> PC
        </h1>
      </div>

      <div className="flex flex-col min-width-screen bg-indigo-900 justify-center justify-items-center content-center	">
        
      </div>

      <ProductCard/>
    
    </div>

    );
}