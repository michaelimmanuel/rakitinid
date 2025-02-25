import axios from "axios";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CreateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function CreateDialog({ isOpen, onClose, onSave }: CreateDialogProps) {
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [discountPrice, setDiscountPrice] = useState<number | "">("");
  const [category, setCategory] = useState("Gaming"); // Default to Gaming
  const [quantity, setQuantity] = useState<number | "">(0);
  const [items, setItems] = useState<string>("[]");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !description || !price || isNaN(Number(price))) {
      alert("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    const finalDiscountPrice = discountPrice || 0;
    
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("subtitle", subtitle);
      formData.append("description", description);
      formData.append("price", price.toString());
      formData.append("discountPrice", finalDiscountPrice.toString());
      formData.append("category", category);
      formData.append("quantity", quantity.toString());
      formData.append("items", JSON.stringify(JSON.parse(items)));
      if (coverImage) formData.append("coverImage", coverImage);
      if (image) formData.append("image", image);

      const response = await axios.post("/api/prebuilt", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onSave(response.data);
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
      <DialogContent className="bg-white text-black max-w-md overflow-scroll max-h-screen ">
        <DialogHeader>
          <DialogTitle>Create New Prebuilt Item</DialogTitle>
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
            <Input type="number" value={discountPrice} onChange={(e) => setDiscountPrice(Number(e.target.value))} />
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
            <label className="block text-sm font-medium text-gray-700">Item 1</label>
            <Input
              type="text"
              value={JSON.parse(items)[0] || ""}
              onChange={(e) => {
              const newItems = JSON.parse(items);
              newItems[0] = e.target.value;
              setItems(JSON.stringify(newItems));
              }}
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Item 2</label>
            <Input
              type="text"
              value={JSON.parse(items)[1] || ""}
              onChange={(e) => {
              const newItems = JSON.parse(items);
              newItems[1] = e.target.value;
              setItems(JSON.stringify(newItems));
              }}
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Item 3</label>
            <Input
              type="text"
              value={JSON.parse(items)[2] || ""}
              onChange={(e) => {
              const newItems = JSON.parse(items);
              newItems[2] = e.target.value;
              setItems(JSON.stringify(newItems));
              }}
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Item 4</label>
            <Input
              type="text"
              value={JSON.parse(items)[3] || ""}
              onChange={(e) => {
              const newItems = JSON.parse(items);
              newItems[3] = e.target.value;
              setItems(JSON.stringify(newItems));
              }}
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
