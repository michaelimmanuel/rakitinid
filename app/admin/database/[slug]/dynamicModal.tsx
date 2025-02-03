"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  columns: string[];
  initialData?: Record<string, any>;
  title: string;
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [socketTypes, setSocketTypes] = useState<{ id: number; name: string }[]>([]);
  const [isCustomSocket, setIsCustomSocket] = useState(false); // Track if "Other" is selected

  // Fetch socket types when the modal opens
  useEffect(() => {
    if (isOpen) {
      axios
        .get("/api/socket_types")
        .then((response) => setSocketTypes(response.data))
        .catch((error) => console.error("Error fetching socket types:", error));
    }
  }, [isOpen]);

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "socket_type_id") {
      if (value === "other") {
        setIsCustomSocket(true);
        setFormData((prev) => ({ ...prev, socket_type_id: "", custom_socket_type: "" }));
      } else {
        setIsCustomSocket(false);
        setFormData((prev) => ({ ...prev, socket_type_id: value, custom_socket_type: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
    columns.forEach((column) => {
      if (formData[column]) {
        formDataToSend.append(column, formData[column]);
      }
    });

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    // If user entered a custom socket type, add it to the form data
    if (isCustomSocket && formData.custom_socket_type) {
      formDataToSend.append("custom_socket_type", formData.custom_socket_type);
    }

    onSubmit(formDataToSend);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-rakitin-bg p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        {/* Dynamically Render Inputs */}
        {columns.map((column) => (
          <div key={column} className="mb-4">
            <label className="block text-sm text-rakitin-orange font-medium mb-1">{column}</label>

            {column === "socket_type_id" ? (
              <>
                {/* Dropdown for existing socket types */}
                <select
                  name="socket_type_id"
                  value={formData.socket_type_id || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-black"
                >
                  <option value="">Select a Socket Type</option>
                  {socketTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                  <option value="other">Other (Type New)</option>
                </select>

                {/* Show input field if "Other" is selected */}
                {isCustomSocket && (
                  <input
                    name="custom_socket_type"
                    value={formData.custom_socket_type || ""}
                    onChange={handleChange}
                    placeholder="Enter new socket type"
                    className="w-full mt-2 p-2 border rounded text-black"
                  />
                )}
              </>
            ) : (
              <input
                name={column}
                value={formData[column] || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              />
            )}
          </div>
        ))}

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm text-rakitin-orange font-medium mb-1">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded text-black" />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
        </div>

        <div className="flex justify-end">
          <Button className="mr-2" onClick={onClose}>Cancel</Button>
          <Button className="bg-rakitin-orange text-white" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
