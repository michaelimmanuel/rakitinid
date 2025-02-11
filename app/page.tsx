
import HeroPage from "@/components/component/test/hero";
import PcBuilder from "@/components/component/test/pcBuilder";
import Service from "@/components/component/test/service";
import WhatSetsUsApart from "@/components/component/test/whatSetsUs";
import NavBar from "@/components/Navbar";
import Contact from "@/components/component/test/contact";
import Maintenence from "@/components/component/test/maintenence";
import PrebuiltCategory from "@/components/component/test/prebuilt-category";
export default function Page() {
    return (
        <div className="relative">
            <NavBar />
            <main className="">
                <section id="hero">
                    <HeroPage />
                </section>
                <section id="service">
                    <Service />
                </section>
                <section id="prebuild">
                    <PrebuiltCategory />
                </section>
                <section id="whatSetsUsApart">
                    <WhatSetsUsApart />
                </section>
                <section>
                    <Maintenence />
                </section>
                <section id="pcBuilder">
                    <PcBuilder />
                </section>
                <section id="contact">
                    <Contact />
                </section>
            </main>
        </div>
    );
}
