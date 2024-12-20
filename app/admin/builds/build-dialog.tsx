"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { init } from "next/dist/compiled/webpack/webpack";
import { get } from "http";
import { Button } from "@/components/ui/button";
import { ItemDialog } from "@/components/component/test/item-dialog";
import { set } from "react-hook-form";


interface ItemDialogProps {
    isOpen: boolean;
    onClose: () => void;
    id: string; 
  }

export function BuildDialog({ isOpen, onClose, id }: ItemDialogProps) {
    const [build, setBuild] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState<any>(null);
    const [selectedData, setSelectedData] = useState<{ [key: string]: { name: string; price: number; socket_type_id?: string } }>({});
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    



    const handleClose = () => {
        setSelectedData({}); // Clear the selected data
        onClose(); // Call the parent onClose handler
    };

    
    const getItemName = (item: string) => {
        if(selectedData[item]?.name) {
            return selectedData[item].name;
        } else if(initialData[`${item.toLowerCase()}Price`]) {
            return initialData[`${item}`];
        } else {
            return `Select ${item}`;
        }
    }

    const getItemPrice = (item: string) => {
        if(selectedData[item]?.price) {
            return selectedData[item].price;
        } else if(initialData[`${item.toLowerCase()}Price`]) {
            return initialData[`${item.toLowerCase()}Price`];
        } else {
            return 0;
        }
    }

    const calculateTotalPrice = () => {
        return data.reduce((total, item) => {
            return total + getItemPrice(item);
        }, 0);
    };
    
   
    const data = ["Processor", "Motherboard", "GPU", "RAM", "Storage", "PSU", "Casing"];
    useEffect(() => {
        if (isOpen) {
            console.log(initialData)
            fetchData(id);

        }
    }, [isOpen, id]);

    const fetchData = async (id: string) => {
        setLoading(true);
        try {
            axios.get(`/api/builds/${id}`).then((response) => {
                
                setInitialData({"Processor": response.data.processor,
                    "Motherboard": response.data.motherboard,
                    "GPU": response.data.gpu,
                    "RAM": response.data.ram,
                    "Storage": response.data.storage,
                    "PSU": response.data.psu,
                    "Casing": response.data.casing,
                    "processorPrice": response.data.processorPrice,
                    "motherboardPrice": response.data.motherboardPrice,
                    "gpuPrice": response.data.gpuPrice,
                    "ramPrice": response.data.ramPrice,
                    "storagePrice": response.data.storagePrice,
                    "psuPrice": response.data.psuPrice,
                    "casingPrice": response.data.casingPrice});
            });
        } catch (error) {
            console.error(`Failed to fetch data for build:`, error);
        } finally {
            setLoading(false);
        }
    };

    const handleItemClick = (item: string) => {
        setSelectedItem(item); // Open dialog with selected item
      };
    
      const handleChildData = (item: { name: string; price: number; socket_type_id?:string }) => {
        setSelectedData((prev) => ({
          ...prev,
          [selectedItem || ""]: item, // Save selected item by type
        }));
        setSelectedItem(null); // Close dialog
        console.log(item);
      };

    const handleSubmit = async () => {
        const keys = Object.keys(selectedData);
        const payload: { [key: string]: any } = {}
        keys.map((key) => {
            payload[key.toLowerCase()] = selectedData[key].name;
            payload[`${key.toLowerCase()}Price`] = selectedData[key].price;
        })
        axios.put(`/api/builds/${id}`, payload).then((response) => {
            console.log("PUT Response:", response.data); // Check what the API returns
            fetchData(id); // Refresh the data
        }).catch((error) => console.error("Error updating data:", error));
    }
    

    return (
        

        <Dialog open={isOpen} onOpenChange={handleClose} >
            <DialogContent className="bg-[#0B192C] text-white w-screen max-w-[90%]">
                <DialogHeader>
                    <DialogTitle>Build Details</DialogTitle>
                </DialogHeader>
                    {!initialData ? ( <p>Loading build...</p> ) :
                    
                    (
                        <div>
                    <Button variant={"success"} className="" onClick={handleSubmit}>Create Invoice</Button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 mt-5">
                       
                        {data.map((item, index) => (
                            <div key={index} onClick={() => handleItemClick(item)}>
                                <h1 className="text-xl font-bold mb-3">{item}</h1>
                                <div className="bg-white flex flex-col h-auto rounded-lg text-black items-start p-3 border">
                                    <p className="text-gray w-full font-semibold">
                                    {getItemName(item)}
                                    </p>
                                    
                                    <p className="text-gray w-full text-sm">
                                        Rp {getItemPrice(item).toLocaleString()}
                                    </p>
                                    
                                </div>
                            </div>
                        ))}
                        <div className="w-full">
                        <div className="mt-5">
                            <h2 className="text-lg font-bold">Total Price</h2>
                            <p className="text-xl font-semibold">
                                Rp {calculateTotalPrice().toLocaleString()}
                            </p>
                        </div>

                        <Button variant={"success"} className="w-full" onClick={handleSubmit}>Edit</Button>
                        </div>
                        
                    
                    </div>
                    </div>)}
            </DialogContent>
            <ItemDialog
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                itemName={selectedItem || ""}
                sendDataToParent={handleChildData}
                socketId={selectedData["Processor"]?.socket_type_id}
            />
        </Dialog>
    );
}