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
  const [subtitle, setSubtitle] = useState(""); // Added subtitle
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [discountPrice, setDiscountPrice] = useState<number | "">(""); // Added discountPrice
  const [category, setCategory] = useState(""); // Added category
  const [quantity, setQuantity] = useState<number | "">(""); // Added quantity
  const [items, setItems] = useState(""); // Added items
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize form state from the `data` prop
  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setDescription(data.description || "");
      setPrice(data.price || "");
      setDiscountPrice(data.price || 0); // Default to price if discountPrice is not provided
    }
  }, [data]);

  const handleSubmit = async () => {
    if (!name || !description || !price || isNaN(Number(price))) {
      alert("Please fill out all required fields.");
      return;
    }


    const finalDiscountPrice = discountPrice || 0;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("subtitle", subtitle);
      formData.append("description", description);
      formData.append("price", price.toString());
      formData.append("discountPrice", finalDiscountPrice.toString());
      formData.append("category", category);
      formData.append("quantity", quantity.toString());
      formData.append("items", items); // Will be stored as JSON string
      if (coverImage) formData.append("coverImage", coverImage);
      if (image) formData.append("image", image);

      const response = await axios.put(`/api/prebuilt/id/${data?.id || ""}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onSave(response.data); // Pass data back to parent
      onClose();
    } catch (error) {
      console.error("Error saving prebuilt:", error);
      alert("Failed to save prebuilt item.");
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
      await axios.delete(`/api/prebuilt/id/${data.id}`);
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

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <Input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount Price</label>
            <Input
              type="number"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(Number(e.target.value) || 0)} // Default to 0 if input is invalid
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="Gaming">Gaming</option>
              <option value="Workstation">Workstation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <Input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Items (JSON)</label>
            <Textarea
              value={items}
              onChange={(e) => setItems(e.target.value)}
              placeholder='e.g., ["item1", "item2"]'
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cover Image</label>
            <Input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files?.[0] || null)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          </div>
          <Button type="button" onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save"}
          </Button>
          {data && (
            <Button type="button" onClick={handleDelete} disabled={loading} className="w-full">
              Delete
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
