"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ItemDialog } from "@/components/component/test/item-dialog";

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
    const [fields, setFields] = useState<{ name: string; price: string }[]>([]);

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
        } else if(initialData[`${item.toLowerCase().replace(/\s/g, '')}Price`]) {
            return initialData[`${item.toLowerCase()}Price`];
        } else {
            return 0;
        }
    }

    const calculateTotalPrice = () => {
        const allItems = [...data, ...fans, ...storage,...accessories]; // Combine all items, fans, and accessories
        const itemsTotal = allItems.reduce((total, item) => {
            return total + (initialData[`${item.toLowerCase().replace(/\s/g, '')}Price`] || 0);
        }, 0);
    
        // Calculate services total
        const servicesTotal = fields.reduce((total, field) => {
            const price = parseFloat(field.price) || 0; // Ensure the price is a number
            return total + price;
        }, 0);
    
        // Add items total and services total
        return itemsTotal + servicesTotal;
    };

    const data = ["Processor", "Motherboard", "GPU", "RAM", "PSU", "Casing", "Cooler"];
    const storage = ["Storage 1", "Storage 2"];
    const fans = ['Fan 1', 'Fan 2', 'Fan 3', 'Fan 4']
    const accessories = ["Accessories 1", "Accessories 2", "Accessories 3", "Accessories 4"];

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
                setInitialData({
                    "Processor": response.data.processor,
                    "Motherboard": response.data.motherboard,
                    "GPU": response.data.gpu,
                    "RAM": response.data.ram,
                    "Storage 1": response.data.storage1,
                    "Storage 2": response.data.storage2,
                    "PSU": response.data.psu,
                    "Casing": response.data.casing,
                    "processorPrice": response.data.processorPrice,
                    "motherboardPrice": response.data.motherboardPrice,
                    "gpuPrice": response.data.gpuPrice,
                    "ramPrice": response.data.ramPrice,
                    "storage1Price": response.data.storage1Price,
                    "storage2Price": response.data.storage2Price,
                    "psuPrice": response.data.psuPrice,
                    "casingPrice": response.data.casingPrice,
                    "Fan 1": response.data.fan1,
                    "Fan 2": response.data.fan2,
                    "Fan 3": response.data.fan3,
                    "Fan 4": response.data.fan4,
                    "fan1Price": response.data.fan1Price,
                    "fan2Price": response.data.fan2Price,
                    "fan3Price": response.data.fan3Price,
                    "fan4Price": response.data.fan4Price,
                    "Accessories 1": response.data.accessories1,
                    "Accessories 2": response.data.accessories2,
                    "Accessories 3": response.data.accessories3,
                    "Accessories 4": response.data.accessories4,
                    "Accessories 5": response.data.accessories5,
                    "accessories1Price": response.data.accessories1Price,
                    "accessories2Price": response.data.accessories2Price,
                    "accessories3Price": response.data.accessories3Price,
                    "accessories4Price": response.data.accessories4Price,
                    "accessories5Price": response.data.accessories5Price,
                    "Cooler": response.data.cooler,
                    "coolerPrice": response.data.coolerPrice,
                });
                console.log("Initial Data:", initialData);

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

        if(fields.length > 0) {
            payload["service"] = fields;
        }

        payload["totalPrice"] = calculateTotalPrice();

        console.log("Payload:", payload); // Check the payload before sending it to the API
        axios.put(`/api/builds/${id}`, payload).then((response) => {
            console.log("PUT Response:", response.data); // Check what the API returns
            fetchData(id); // Refresh the data
        }).catch((error) => console.error("Error updating data:", error));
    }

    const handleDelete = async () => {
        axios.delete(`/api/builds/${id}`).then((response) => {
            console.log("DELETE Response:", response.data); // Check what the API returns
            handleClose(); // Close the dialog
        }).catch((error) => console.error("Error deleting data:", error));
    }

    const openInvoice = () => {
        // open /admin/invoice/approval?id=${id}
        window.open(`/test/test/${id}`, '_blank');
    }


        // Add a new field
    const handleAddField = () => {
        setFields([...fields, { name: '', price: '' }]);
    };

    // Update a field
    const handleFieldChange = (index: number, key: 'name' | 'price', value: string) => {
        const updatedFields = [...fields];
        updatedFields[index][key] = value;
        setFields(updatedFields);
    };

    // Remove a field
    const handleRemoveField = (index: number) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
    };

    const updateService = () => {
        console.log(fields);
        // update the total price
        const total = calculateTotalPrice();
        // update the database


    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-[#0B192C] text-white h-[80vh] max-w-[70%] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Build Details</DialogTitle>
                </DialogHeader>
                <Button variant={"destructive"} className="absolute top-5 right-5" onClick={handleDelete}>delete</Button>
                {!initialData ? (
                    <p>Loading build...</p>
                ) : (
                    <div>
                        <Button variant={"success"} className="" onClick={openInvoice}>Create Invoice</Button>
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

                            {storage.map((item, index) => (
                                <div key={index}>
                                    <h1 className="text-xl font-bold mb-3">{item}</h1>
                                    <div className="flex flex-row h-auto rounded-lg text-black items-start p-3 border">
                                        <div className="bg-white flex w-full flex-col h-auto rounded-lg text-black items-start p-3" onClick={() => handleItemClick(item)}>
                                            <p className="text-gray w-full font-semibold">
                                                {initialData[item] || `Select ${item}`}
                                            </p>
                                            <p className="text-gray w-full text-sm">
                                                Rp {initialData[`${item.toLowerCase().replace(/\s/g, '')}Price`]}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {fans.map((item, index) => (
                                <div key={index}>
                                    <h1 className="text-xl font-bold mb-3">{item}</h1>
                                    <div className="flex flex-row h-auto rounded-lg text-black items-start p-3 border">
                                        <div className="bg-white flex w-full flex-col h-auto rounded-lg text-black items-start p-3" onClick={() => handleItemClick(item)}>
                                            <p className="text-gray w-full font-semibold">
                                                {initialData[item] || `Select ${item}`}
                                            </p>
                                            {/* {selectedData[item]?.price && ( */}
                                                <p className="text-gray w-full text-sm">
                                                    Rp {initialData[`${item.toLowerCase().replace(/\s/g, '')}Price`]}
                                                </p>
                                            {/* )} */}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {accessories.map((item, index) => (
                                <div key={index}>
                                    <h1 className="text-xl font-bold mb-3">{item}</h1>
                                    <div className="flex flex-row h-auto rounded-lg text-black items-start p-3 border">
                                        <div className="bg-white flex w-full flex-col h-auto rounded-lg text-black items-start p-3" onClick={() => handleItemClick(item)}>
                                            <p className="text-gray w-full font-semibold">
                                                {initialData[item] || `Select ${item}`}
                                            </p>
                                            {/* {selectedData[item]?.price && ( */}
                                                <p className="text-gray w-full text-sm">
                                                    Rp {initialData[`${item.toLowerCase().replace(/\s/g, '')}Price`]}
                                                </p>
                                            {/* )} */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            <div className="flex flex-col items-center mt-10 mb-28">
                                <Button variant={"default"} className="w-full"  onClick={handleAddField} >Add Service</Button>
                                {fields.length > 0 && (
                                    <Button variant={"default"} className="w-full mt-5" onClick={updateService}>Save Service Data</Button>
                                )}
                                    <div className="mt-4 ">
                                    {fields.map((field, index) => (
                                    <div key={index} className="flex space-x-2 text-black">
                                        <input
                                        type="text"
                                        placeholder="Name"
                                        value={field.name}
                                        onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                                        className="p-2 border rounded"
                                        />
                                        <input
                                        type="text"
                                        placeholder="Value"
                                        value={field.price}
                                        onChange={(e) => handleFieldChange(index, 'price', e.target.value)}
                                        className="p-2 border rounded"
                                        />
                                        <button
                                        className="p-2 bg-red-500 text-white rounded"
                                        onClick={() => handleRemoveField(index)}
                                        >
                                        Remove
                                        </button>
                                    </div>
                                    ))}
                                </div>
                            </div>

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

                        
                    </div>
                )}
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