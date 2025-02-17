"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PrebuildCard from "@/components/component/test/prebuilt-card";
import PrebuiltDetails from "@/components/component/test/prebuilt-detail";

interface PrebuiltItem {
    coverImage: string;
    createdAt: string;
    description: string;
    subtitle: string;
    id: number;
    image: string;
    name: string;
    price: number;
    items: string[];
    updatedAt: string;
    discountPrice: number;
}

// Define dynamic price ranges
const PRICE_RANGES = [
    { label: "< Rp. 10.000.000", min: 0, max: 10_000_000 },
    { label: "Rp. 10.000.000 - Rp. 20.000.000", min: 10_000_001, max: 20_000_000 },
    { label: "Rp. 20.000.000", min: 20_000_001, max: Infinity },
];

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [prebuilts, setPrebuilts] = useState<PrebuiltItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<PrebuiltItem | null>(null); // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false); // Track modal open state

    const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/prebuilt/gaming");
            console.log(response.data);
            setPrebuilts(response.data);
        } catch (error) {
            console.error("Failed to fetch prebuilts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Function to scroll to a section dynamically
    const handleScrollToSection = (label: string) => {
        if (sectionRefs.current[label]) {
            sectionRefs.current[label]?.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Open modal when clicking a prebuilt item
    const openModal = (item: PrebuiltItem) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-black text-white flex flex-col md:flex-row min-h-screen">
            {/* Sidebar for dynamic filters */}
            <div className="w-full md:w-1/4 p-6 bg-gray-900 flex flex-col gap-4 md:h-full md:sticky top-0">
                <h2 className="text-xl font-bold mb-4">Filter By Price</h2>
                {PRICE_RANGES.map((range) => (
                    <button
                        key={range.label}
                        onClick={() => handleScrollToSection(range.label)}
                        className="px-4 py-2 text-left rounded-lg bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white"
                    >
                        {range.label}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4 p-6 overflow-y-auto">
                {PRICE_RANGES.map((range) => {
                    const filteredItems = prebuilts.filter(
                        (p) => p.price >= range.min && p.price <= range.max
                    );

                    return (
                        <div key={range.label} ref={(el) => { sectionRefs.current[range.label] = el; }} className="mb-16 pt-20">
                            <h2 className="text-2xl font-bold mb-10">{range.label}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((prebuilt) => (
                                        <div
                                            key={prebuilt.id}
                                            onClick={() => openModal(prebuilt)}
                                            className="cursor-pointer"
                                        >
                                            <PrebuildCard
                                                src={prebuilt.coverImage}
                                                subtitle={prebuilt.subtitle}
                                                alt={prebuilt.name}
                                                title={prebuilt.name}
                                                price={prebuilt.price}
                                                items={prebuilt.items}
                                                discountPrice={prebuilt.discountPrice}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400">No items in this range.</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Floating Modal Component */}
            <PrebuiltDetails isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} item={selectedItem} />
        </div>
    );
};

export default Page;
