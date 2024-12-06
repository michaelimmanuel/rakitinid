"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DynamicModal } from "./dynamicModal"; // Import dynamic modal component

interface PageProps {
  params: {
    slug: string;
  };
}

type DataType = Record<string, any>;

export default function Page({ params }: PageProps) {
  const [data, setData] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<DataType | null>(null);
  const [modalHeader, setModalHeader] = useState(""); // State for modal header

  const slug = params.slug;

  const getData = (slug: string) => {
    axios
      .get(`/api/${slug}`)
      .then((response) =>
        setData(
          response.data.map((item: DataType) => {
            delete item.createdAt;
            delete item.updatedAt;
            return item;
          })
        )
      )
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    if (slug) {
      getData(slug);
    }
  }, [slug]);

  const excludeKeys = ["memory", "memory_type", "createdAt", "updatedAt", "id"];
  const tableHeaders = Object.keys(data[0] || {}).filter((key) => !excludeKeys.includes(key));

  const handleEdit = (id: number) => {
    const item = data.find((item) => item.id === id);
    if (item) {
      setCurrentItem(item); // Pass current item for editing
      setIsModalOpen(true);
      setModalHeader("Edit Data"); // Set modal header for editing
    }
  };

  const handleCreate = () => {
    const emptyData = tableHeaders.reduce((acc, key) => {
      acc[key] = ""; // Initialize all fields as empty
      return acc;
    }, {} as DataType);

    setCurrentItem(emptyData); // Open the modal with empty fields
    setModalHeader("Create Data"); // Set modal header
    setIsModalOpen(true); // Open modal
  };

  const handleUpdate = (submittedData: FormData) => {
    if (!currentItem?.id) {
      // Create new data
      axios
        .post(`/api/${slug}/`, submittedData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important to send form data correctly
          },
        })
        .then((response) => {
          setData((prev) => [...prev, response.data]); // Add new data to the table
          setIsModalOpen(false); // Close modal
        })
        .catch((error) => console.error("Error creating data:", error));
    } else {
      // Edit existing data
      axios
        .put(`/api/${slug}/id/${currentItem.id}`, submittedData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for editing data with image
          },
        })
        .then(() => {
          setData((prev) =>
            prev.map((item) =>
              item.id === currentItem.id ? { ...item, ...submittedData } : item
            )
          ); // Update table data
          setIsModalOpen(false); // Close modal
        })
        .catch((error) => console.error("Error updating data:", error));
    }
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`/api/${slug}/id/${id}`)
      .then(() => setData(data.filter((item) => item.id !== id)))
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <div className="w-dvh">
      <h1>Data for {slug}</h1>
      <div className="flex justify-end mb-4">
        <Button className="bg-rakitin-orange text-white" onClick={handleCreate}>
          Add Data
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            {tableHeaders.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              {tableHeaders.map((key) => (
                <TableCell key={key}>
                  {key === "image" ? (
                    <img src={item[key]} alt="Image" className="w-16 h-16 object-cover" />
                  ) : (
                    item[key]
                  )}
                </TableCell>
              ))}
              <TableCell>
                <Button variant="outline" className="mr-2" onClick={() => handleEdit(item.id)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DynamicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdate}
        columns={tableHeaders}
        initialData={currentItem || {}} // Pass an empty object for creation
        title={modalHeader}
      />
    </div>
  );
}
