import axios from "axios";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
 


interface CreateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void; // Callback to save the data
}

export default function CreateDialog({ isOpen, onClose, onSave }: CreateDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
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

      const response = await axios.post("/api/prebuilt", formData, {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Prebuilt Item</DialogTitle>
        </DialogHeader>
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
          <Button type="button" onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
