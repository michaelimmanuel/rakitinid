"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cropper from "react-easy-crop";

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
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [socketTypes, setSocketTypes] = useState<{ id: number; name: string }[]>([]);
  const [isCustomSocket, setIsCustomSocket] = useState(false);

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
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = async () => {
    if (!imagePreview || !croppedAreaPixels) return;

    const image = new Image();
    image.src = imagePreview;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = croppedAreaPixels;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      width,
      height,
      0,
      0,
      width,
      height
    );

    canvas.toBlob((blob) => {
      if (blob) {
        const croppedFile = new File([blob], "cropped_image.png", { type: "image/png" });
        setImageFile(croppedFile);
        setCroppedImage(URL.createObjectURL(blob));
        setIsCropping(false);
      }
    }, "image/png");
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

    if (isCustomSocket && formData.custom_socket_type) {
      formDataToSend.append("custom_socket_type", formData.custom_socket_type);
    }

    onSubmit(formDataToSend);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-scroll">
      <div className="bg-rakitin-bg p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        {columns.map((column) => (
          <div key={column} className="mb-4">
            <label className="block text-sm text-rakitin-orange font-medium mb-1">{column}</label>
            {column === "socket_type_id" ? (
              <>
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

    <div className="mb-4">
      <label className="block text-sm text-rakitin-orange font-medium mb-1">Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 border rounded text-black"
      />

      {imagePreview && isCropping && (
        <div
          className="relative w-full flex flex-col items-center"
          onWheel={(e) => {
            e.preventDefault();
            const zoomStep = 0.05; // Lower sensitivity
            const newZoom = zoom + (e.deltaY > 0 ? -zoomStep : zoomStep);
            setZoom(Math.min(Math.max(newZoom, 1), 3)); // Keep zoom between 1x and 3x
          }}
        >
          <div className="w-full h-64 relative">
            <Cropper
              image={imagePreview}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <Button onClick={getCroppedImg} className="mt-2 bg-rakitin-orange text-white">
            Crop Image
          </Button>
        </div>
      )}

      {croppedImage && <img src={croppedImage} alt="Cropped Preview" className="mt-2 w-32 h-32 object-cover" />}
</div>

        <div className="flex justify-end">
          <Button className="mr-2" onClick={onClose}>Cancel</Button>
          <Button className="bg-rakitin-orange text-white" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
