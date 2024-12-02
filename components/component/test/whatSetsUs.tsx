import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export default function WhatSetsUsApart() {
    return (
      <section className="w-full bg-[#8E8E93] py-12 text-white lg:px-20">
        <div className="container px-4 md:px-6 mb-10">
            <div className="flex-row lg:flex justify-between">
                <h2 className="mb-8 text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
                    What Sets Us Apart
                </h2>
                <p className="w-full lg:w-1/3 lg:text-right font-light text-sm">Discover why thousands trust Rakitinlah.id for their PC needs expert craftsmanship, tailored solutions, and unmatched quality at affordable prices.</p>
            </div>
          <div className="flex flex-col mt-10 gap-8 md:flex-row md:justify-between">
            {/* Left Column */}
            <div className="flex-1">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="trusted" className="border-white/20">
                  <AccordionTrigger className="text-xl font-semibold [&[data-state=open]>svg]:rotate-180 [&>svg]:text-white">
                    Trusted by the Community
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90">
                    Join thousands of satisfied customers who trust Rakitinlah.id for their PC needs. Our reputation for
                    quality and reliability speaks for itself.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="craftsmanship" className="border-white/20">
                  <AccordionTrigger className="text-xl font-semibold [&[data-state=open]>svg]:rotate-180 [&>svg]:text-white">
                    Expert Craftsmanship
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90">
                    Our team of experts ensures every PC is built with precision and care, delivering superior performance
                    and reliability.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Right Column */}
            <div className="flex-1 mt-0 sm:pt-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="discover" className="border-white/20">
                  <AccordionTrigger className="text-xl font-semibold [&[data-state=open]>svg]:rotate-180 [&>svg]:text-white">
                    Premium Components
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90">
                    Discover why thousands trust Rakitinlah.id for their PC needs expert craftsmanship,
                    tailored solutions, and unmatched quality at affordable prices.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="community" className="border-white/20">
                  <AccordionTrigger className="text-xl font-semibold [&[data-state=open]>svg]:rotate-180 [&>svg]:text-white">
                    Affordable Pricing
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90">
                    Get the best value for your money with competitive pricing. We offer solutions that match
                    your budget without cutting corners on quality.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  