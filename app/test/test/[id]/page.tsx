"use client";
import React, { useEffect, useState } from "react";
import InvoicePDF from "@/components/InvoicePdf";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { useParams } from "next/navigation";

const InvoicePage = () => {
  const { id } = useParams() as { id: string };
  const [invoiceData, setInvoiceData] = useState<any>(null);

  useEffect(() => {
    const fetchBuildData = async () => {
      try {
        const response = await fetch("/api/builds/" + id);
        const data = await response.json();
      
        // Function to dynamically format the items
        const formatItem = (description : any , quantity : any, price : any) => {
          if (!description || !price) return null; // Skip if description or price is null/empty
          return { description, quantity, price, total: quantity * price };
        };
      
        // Define all potential items dynamically
        const items = [
          formatItem(`Motherboard: ${data.motherboard}`, 1, data.motherboardPrice),
          formatItem(`Processor: ${data.processor}`, 1, data.processorPrice),
          formatItem(`RAM: ${data.ram}`, 1, data.ramPrice),
          formatItem(`GPU: ${data.gpu}`, 1, data.gpuPrice),
          formatItem(`Storage 1: ${data.storage1}`, 1, data.storage1Price),
          formatItem(`Storage 2: ${data.storage2}`, 1, data.storage2Price),
          formatItem(`PSU: ${data.psu}`, 1, data.psuPrice),
          formatItem(`Casing: ${data.casing}`, 1, data.casingPrice),
          formatItem(`Fan 1: ${data.fan1}`, 1, data.fan1Price),
          formatItem(`Fan 2: ${data.fan2}`, 1, data.fan2Price),
          formatItem(`Fan 3: ${data.fan3}`, 1, data.fan3Price),
          formatItem(`Fan 4: ${data.fan4}`, 1, data.fan4Price),
          formatItem(`Accessories 1: ${data.accessories1}`, 1, data.accessories1Price),
          formatItem(`Accessories 2: ${data.accessories2}`, 1, data.accessories2Price),
          formatItem(`Accessories 3: ${data.accessories3}`, 1, data.accessories3Price),
          formatItem(`Accessories 4: ${data.accessories4}`, 1, data.accessories4Price),
          formatItem(`Accessories 5: ${data.accessories5}`, 1, data.accessories5Price),
          formatItem(`Monitor 1: ${data.monitor1}`, 1, data.monitor1Price),
          formatItem(`Monitor 2: ${data.monitor2}`, 1, data.monitor2Price),
          formatItem(`Cooler: ${data.cooler}`, 1, data.coolerPrice),
          ...(data.service || []).map((service: { name: string; price: string }) => 
            formatItem(`Service: ${service.name}`, 1, parseInt(service.price))
          ), // Add services dynamically
        ].filter(Boolean); // Remove any null items
      
        // Format the data for the InvoicePDF component
        const formattedData = {
          date: new Date(data.createdAt).toLocaleDateString(),
          items,
          total: data.totalPrice.toLocaleString(),
        };
      
        setInvoiceData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
    };

    fetchBuildData();
  }, []);

  return (
    <div className="p-20">
      <h1>Invoice</h1>

      {invoiceData ? (
        <div className="h-screen flex flex-col">
          {/* PDF Preview */}
          <PDFViewer style={{ width: "100%", height: "100%" }}>
            <InvoicePDF invoiceData={invoiceData} id={id} />
          </PDFViewer>

          {/* PDF Download */}
          <PDFDownloadLink document={<InvoicePDF invoiceData={invoiceData} id={id} />} fileName="invoice.pdf">
          </PDFDownloadLink>
        </div>
      ) : (
        <p>Loading invoice...</p>
      )}
    </div>
  );
};

export default InvoicePage;
