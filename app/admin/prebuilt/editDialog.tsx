import axios from "axios";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PrebuiltItem {
  coverImage: string;
  createdAt: string;
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
  updatedAt: string;
}

interface CreateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void; // Callback to save the data
  data: PrebuiltItem | null;
}

export default function CreateDialog({ isOpen, onClose, onSave, data }: CreateDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize form state from the `data` prop
  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setDescription(data.description || "");
      setPrice(data.price || "");
    }
  }, [data]);

  const handleSubmit = async (data : number) => {
    if (!name || !description || !price || isNaN(Number(price))) {
      alert("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price.toString());
      if (coverImage) formData.append("coverImage", coverImage);
      if (image) formData.append("image", image);

      const response = await axios.put(`/api/prebuilt/${data}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onSave(response.data); // Pass data back to parent
      onClose();
    } catch (error) {
      console.error("Error creating prebuilt:", error);
      alert("Failed to create prebuilt item.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!data) return;

    const confirm = window.confirm("Are you sure you want to delete this item?");
    if (!confirm) return;

    setLoading(true);

    try {
      await axios.delete(`/api/prebuilt/${data.id}`);
      onSave(null); // Pass data back to parent
      onClose();
    } catch (error) {
      console.error("Error deleting prebuilt:", error);
      alert("Failed to delete prebuilt item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black max-w-dvh w-dvh">
        <DialogHeader>
          <DialogTitle>{data ? "Edit Prebuilt Item" : "Create New Prebuilt Item"}</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[80vh] px-4 space-y-4">
          <p>Cover Image</p>
          <Image
            src={data?.coverImage || "/default-cover.jpg"}
            alt={data?.name || "Default Name"}
            width={150}
            height={150}
            className="aspect-[3/3] w-full max-w-[300px] object-cover transition-all"
            quality={100}
          />
          <p>Image</p>
          <Image
            src={data?.image || "/default-cover.jpg"}
            alt={data?.name || "Default Name"}
            width={300}
            height={300}
            className="aspect-[3/3] w-full max-w-[300px] object-cover transition-all"
            quality={100}
          />

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter item name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter item description"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Enter price"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cover Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>
            <Button type="button" onClick={() => data && handleSubmit(data.id)} disabled={loading} className="w-full">
              {loading ? "Saving..." : "Save"}
            </Button>
            {data && (
              <Button type="button" onClick={handleDelete} disabled={loading} className="w-full">
                Delete
              </Button>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
