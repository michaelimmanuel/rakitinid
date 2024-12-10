import Image from 'next/image';
import { Button } from '@/components/ui/button';
export default function HeroPage() {
    return (
        <div className="relative z-0">
            <div className="h-dvh max-h-dvh sm:max-h-1/3 p-10 lg:p-40 flex items-center">
                {/* Hero Image */}
                <Image 
                    src="/images/hero-img.png" 
                    alt="Hero Image" 
                    fill
                    style={{ objectFit: 'cover' }}
                    priority 
                    quality={100}
                    z-10
                    />
                {/* Text Container */}
                <div className="mb-10 sm:m-auto p-5 lg:p-20 max-w-3xl text-center lg:text-left bg-[#4E5F7E] rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-[8%] lg:ml-0">
                    <h1 className="text-3xl lg:text-5xl font-semibold"> 
                        BUILD YOUR DREAM <br/> PC TODAY.
                    </h1>
                    <p className="text-lg lg:text-2xl mt-10 lg:mt-20 lg:tracking-wide font-normal">
                        From gaming rigs to high-performance workstations, Rakitinlah.id offers custom PC solutions tailored to your needs. Experience power, precision, and personalized design.
                    </p>
                    <div className="lg:flex justify-between sm:h-3xl lg:h-full mt-5 lg:mt-10">
                        <a href="#pcBuilder">
                            <Button className="bg-rakitin-orange text-white h-lg text-lg lg:h-12">
                                Start Building Now
                            </Button>
                        </a>
                        <a href="#prebuild" className="self-center lg:mt-0">
                            <h1 className="self-center mt-5 mb-5 text-sm tracking-tight lg:text-lg underline underline-offset-8 decoration-orange">
                                Explore Ready-to-Ship PCs
                            </h1>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
