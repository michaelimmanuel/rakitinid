"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState, useEffect } from "react";

import BannerList from "./BannerList";


const dummyData = [
    {
      id: '1',
      src: '/placeholder.svg?height=300&width=300',
      alt: 'Summer Sale Banner',
      order: 1
    },
    {
      id: '2',
      src: '/placeholder.svg?height=300&width=300',
      alt: 'New Collection Announcement',
      order: 2
    },
    {
      id: '3',
      src: '/placeholder.svg?height=300&width=300',
      alt: 'Limited Time Offer',
      order: 3
    },
    {
      id: '4',
      src: '/placeholder.svg?height=300&width=300',
      alt: 'Seasonal Discount',
      order: 4
    },
    {
      id: '5',
      src: '/placeholder.svg?height=300&width=300',
      alt: 'Flash Sale Banner',
      order: 5
    },
    {
      id: '6',
      src: '/placeholder.svg?height=300&width=300',
      alt: 'Member Exclusive Deal',
      order: 6
    }
  ];

export default function Banner() {
    const [banners, setBanners] = useState<any[]>([]);
    const [newBanner, setNewBanner] = useState<{ image: File | null; alt: string }>({ image: null, alt: "" });

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/banner")
            .then((response) => {
                console.log("Response data:", response.data);
                setBanners(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        console.log("Banners state updated:", banners);
    }, [banners]);

    const handleUpload = () => {
        const formData = new FormData();
        if (newBanner.image) {
            formData.append("image", newBanner.image);
        }
        formData.append("alt", newBanner.alt);

        axios
            .post("http://localhost:3000/api/banner", formData)
            .then((response) => {
                setBanners([...banners, response.data]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = (id: string) => {
        axios
            .delete(`http://localhost:3000/api/banner/${id}`)
            .then(() => {
                setBanners(banners.filter((banner) => banner.id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
            console.log('Deleted banner with ID:', id);
    };

    const handleOrderUpdate = (newBanners: any) => {
        setBanners(newBanners);
       
        // In a real application, you would send this update to your backend
        console.log('New banner order:', newBanners);
    };
    
    const updateOrder = () => {
        // get only id and order
        const newOrder = banners.map(({ id, order }) => ({ id, order }));
        axios
            .put("http://localhost:3000/api/banner", newOrder)
            .then((response) => {
                console.log("Response data:", response.data);
            })
            .catch((error) => {
                console.log(error);
            }
        );
        
    }  

    return (
        <div>
            <div className="mt-4 p-5">
                <Label htmlFor="picture">Picture</Label>
                <Input
                    id="picture"
                    type="file"
                    className="text-black mt-5 mb-5 w-1/5"
                    onChange={(e) =>
                        setNewBanner({ ...newBanner, image: e.target.files ? e.target.files[0] : null })
                    }
                />
                <Input
                    type="text"
                    placeholder="Alt"
                    className="text-black mt-5 mb-5"
                    onChange={(e) => setNewBanner({ ...newBanner, alt: e.target.value })}
                />
                <Button variant={"success"} onClick={handleUpload}>
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

                <Button variant={"success"} onClick={updateOrder}> update urutan </Button>
            </div>
        </div>
    );
}
