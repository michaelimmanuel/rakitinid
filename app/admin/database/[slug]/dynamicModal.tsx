"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  columns: string[]; // List of column names to generate input fields
  initialData?: Record<string, any>; // Initial values for the form (optional)
  title: string; // Title for the modal
}

export function DynamicModal({
  isOpen,
  onClose,
  onSubmit,
  columns,
  initialData,
  title,
}: DynamicModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [imageFile, setImageFile] = useState<File | null>(null); // State for holding the image file
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Preview the image

  useEffect(() => {
    setFormData(initialData || {}); // Reset form with initialData or empty object
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const formDataToSend = new FormData();

    // Append other fields from the form
    columns.forEach((column) => {
      if (formData[column]) {
        formDataToSend.append(column, formData[column]);
      }
    });

    // Append image if it's present
    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    // Send the formData to the parent onSubmit handler
    onSubmit(formDataToSend);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-rakitin-bg p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {/* Render input fields dynamically based on the columns */}
        {columns.map((column) => (
          <div key={column} className="mb-4">
            <label className="block text-sm text-rakitin-orange font-medium mb-1">{column}</label>
            <input
              name={column}
              value={formData[column] || ""} // Default to an empty string
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
        ))}

        {/* Image Upload Input */}
        <div className="mb-4">
          <label className="block text-sm text-rakitin-orange font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded text-black"
          />
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Image Preview" className="w-32 h-32 object-cover" />
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button className="mr-2" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-rakitin-orange text-white" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
