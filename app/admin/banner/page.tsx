"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState, useEffect } from "react";
import BannerList from "./BannerList";

export default function Banner() {
    const [banners, setBanners] = useState<any[]>([]);
    const [newBanner, setNewBanner] = useState<{ 
        desktopImage: File | null;
        mobileImage: File | null;
        alt: string; 
    }>({ desktopImage: null, mobileImage: null, alt: "" });

    useEffect(() => {
        axios.get("/api/banner")
            .then((response) => setBanners(response.data))
            .catch((error) => console.log(error));
    }, []);

    const handleUpload = () => {
        const formData = new FormData();
        if (newBanner.desktopImage) {
            formData.append("src", newBanner.desktopImage);
        }
        if (newBanner.mobileImage) {
            formData.append("src_mobile", newBanner.mobileImage);
        }
        formData.append("alt", newBanner.alt);

        axios.post("/api/banner", formData)
            .then((response) => setBanners([...banners, response.data]))
            .catch((error) => console.log(error));
    };

    const handleDelete = (id: string) => {
        axios.delete(`/api/banner/${id}`)
            .then(() => setBanners(banners.filter((banner) => banner.id !== id)))
            .catch((error) => console.log(error));
    };

    const handleOrderUpdate = (newBanners: any) => {
        setBanners(newBanners);
        console.log('New banner order:', newBanners);
    };

    const updateOrder = () => {
        const newOrder = banners.map(({ id, order }) => ({ id, order }));
        axios.put("/api/banner", newOrder)
            .then((response) => console.log("Response data:", response.data))
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <div className="mt-4 p-5">
            <style jsx>{`
                    @keyframes rainbow {
                        0% { background-color: red; }
                        14% { background-color: orange; }
                        28% { background-color: yellow; }
                        42% { background-color: green; }
                        57% { background-color: blue; }
                        71% { background-color: indigo; }
                        85% { background-color: violet; }
                        100% { background-color: red; }
                    }
                    .rainbow {
                        animation: rainbow 5s linear infinite;
                    }
                `}</style>
                <Label htmlFor="desktop-picture">Desktop Picture</Label>
                <Input
                    id="desktop-picture"
                    type="file"
                    className="text-black mt-2 mb-5 w-1/5"
                    onChange={(e) =>
                        setNewBanner({ ...newBanner, desktopImage: e.target.files ? e.target.files[0] : null })
                    }
                />
                
                <Label htmlFor="mobile-picture">Mobile Picture</Label>
                 
           
               
                <Input
                    id="mobile-picture"
                    type="file"
                    className="mt-2 mb-5 w-1/5 text-black"
                    onChange={(e) =>
                        setNewBanner({ ...newBanner, mobileImage: e.target.files ? e.target.files[0] : null })
                    }
                />
                
                <Input
                    type="text"
                    placeholder="Alt Text"
                    className="mt-2 mb-5"
                    onChange={(e) => setNewBanner({ ...newBanner, alt: e.target.value })}
                />
               
                <div className="">Add Banner</div>
                <Button variant="success" onClick={handleUpload}>
                    Add Banner
                </Button>
            </div>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Banner Management</h1>
                <BannerList 
                    initialBanners={banners} 
                    onOrderUpdate={handleOrderUpdate} 
                    onDelete={handleDelete} 
                />
                <Button variant="success" onClick={updateOrder}> Update Order </Button>
            </div>
        </div>
    );
}
