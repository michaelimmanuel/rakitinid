
import HeroPage from "@/components/component/test/hero";
import PcBuilder from "@/components/component/test/pcBuilder";
import Prebuild from "@/components/component/test/prebuilt";
import Service from "@/components/component/test/service";
import WhatSetsUsApart from "@/components/component/test/whatSetsUs";
import NavBar from "@/components/Navbar";
import Contact from "@/components/component/test/contact";
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
                    <Prebuild />
                </section>
                <section id="whatSetsUsApart">
                    <WhatSetsUsApart />
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
