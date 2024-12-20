"use client";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';

interface DynamicModalProps {
    isOpen: boolean;
    onClose: () => void;
    id: number;
    slug: string;
}

export default function EditPurchaseDialog({ isOpen, onClose, id, slug }: DynamicModalProps) {
    const [data, setData] = useState<any[]>([]);
    const [newPrice, setNewPrice] = useState<number | "">("");
    const [quantity, setQuantity] = useState<number | "">("");

    const getData = (slug: string) => {
        let slug_id = slug + "_id";
        axios
            .get(`/api/${slug}/purchaseprice/${id}`)
            .then((response) =>
                setData(
                    response.data.map((item: any) => {
                        delete item.createdAt;
                        delete item.updatedAt;
                        return item;
                    })
                )
            )
            .catch((error) => console.error("Error fetching data:", error));
    }

    useEffect(() => {
        if (id !== 0) {
            getData(slug);
            console.log(data);
        }
    }, [id]);

    const handleCreate = () => {
        var slug_id = slug + "_id";
        let purchaseData = {
            price: newPrice,
            quantity: quantity,
            [slug_id]: id
        }
        axios
            .post(`/api/${slug}/purchaseprice/${id}`, purchaseData)
            .then((response) => {
                console.log("POST Response:", response.data); // Check what the API returns
                getData(slug); // Refresh the data
                setNewPrice("");
                setQuantity("");
            })
            .catch((error) => console.error("Error creating data:", error));
    }

    const closeDialog = () => {
        // clear all of the useState
        setNewPrice("");
        setQuantity("");
        setData([]);
        onClose();
    }

    const editData = (id: number, initialPrice: string, initialQuantity:string) => {
        let purchaseData = {
            price: newPrice || initialPrice,
            quantity: quantity || initialQuantity
        }
        console.log("PUT Data:", purchaseData);
        axios.put(`/api/${slug}/purchaseprice/${id}`, purchaseData).then((response) => {
            console.log("PUT Response:", response.data); // Check what the API returns
            getData(slug); // Refresh the data
        }).catch((error) => console.error("Error updating data:", error));
        
    }

    const deleteData = (id: number) => {
        axios.delete(`/api/${slug}/purchaseprice/${id}`).then((response) => {
            console.log("DELETE Response:", response.data); // Check what the API returns
            getData(slug); // Refresh the data
        }).catch((error) => console.error("Error deleting data:", error));
    }

    return (
        <Dialog open={isOpen} onOpenChange={closeDialog}>
            <DialogContent className='bg-rakitin-bg '>
                <DialogHeader>
                    <DialogTitle>Edit Purchase</DialogTitle>
                    <DialogDescription>Edit the purchase price</DialogDescription>
                </DialogHeader>

                <div className='text-black'>
                    <input className="mr-5" type="text" placeholder="Enter new price" onChange={(e) => setNewPrice(Number(e.target.value))} />
                    <input type="text" placeholder="Enter quantity" onChange={(e) => setQuantity(Number(e.target.value))} />
                </div>

                <Button onClick={handleCreate} variant='success' className='w-[20%]'>Create</Button>

                <div className='flex flex-col'>
                    {data.map((item) => (
                    <div>
                        <div key={item.id} className='flex justify-between items-center w-[50%]'>
                            <div className='flex-row flex gap-3 text-black'>
                                <div>
                                    <Label className='text-white'>Price</Label>
                                    <Input type='number' placeholder={item.price} onChange={(e) => setNewPrice(Number(e.target.value))} />
                                </div>
                                <div>
                                    <Label className='text-white'>Quantity</Label>
                                    <Input type='number' placeholder={item.quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                                </div>
                            </div>
                        </div>
                        <div className='flex-row flex mt-5'>
                        <div>
                            <Button onClick={() => deleteData(item.id)} variant='destructive'>Delete</Button>
                            <Button  onClick={() => editData(item.id, item.price, item.quantity)} className="ml-4" variant='default'>Edit</Button>
                        </div>
                    </div>
                    </div>
                        
                    ))}
                    {/* 
                    
                     */}
                  
                
                                      
                </div>
            </DialogContent>
        </Dialog>
    )
}