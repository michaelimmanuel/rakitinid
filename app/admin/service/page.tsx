"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";


export default function Page(){
    const [fields, setFields] = useState<{ name: string; price: string }[]>([]);


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
        const total = fields.reduce((acc, field) => {
            return acc + Number(field.price);
        }, 0);

        const name = fields
        console.log('Service Name:', name);
        console.log('Service Total:', total);
        axios.post('/api/service', {
            name: name,
            price: total
        }).then((response) => {
            console.log(response.data);
        }
        ).catch((error) => {
            console.error('Failed to update service:', error);
        });

    };

    return (
        <div className="flex flex-col items-center mt-10 mb-28">
            <Button variant={"default"} className="w-full"  onClick={handleAddField} >Add Service</Button>
           
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

            {fields.length > 0 && (
                <Button variant={"default"} className="w-full mt-5" onClick={updateService}>Save Service Data</Button>
            )}
        </div>
    );
}