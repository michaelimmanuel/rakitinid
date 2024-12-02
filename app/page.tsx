import HeroPage from "@/components/component/test/hero";
import PcBuilder from "@/components/component/test/pcBuilder";
import Prebuild from "@/components/component/test/prebuilt";
import Service from "@/components/component/test/service";
import WhatSetsUsApart from "@/components/component/test/whatSetsUs";
export default function Page() {
    return (
        <div className="">
            <HeroPage />
            <Service />
            <Prebuild />
            <WhatSetsUsApart />
            <PcBuilder />
        </div>
    );
}
