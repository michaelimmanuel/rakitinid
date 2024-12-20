"use client";
import React, { useEffect, useState } from "react";
import InvoicePDF from "@/components/InvoicePdf";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { useParams } from "next/navigation";

const InvoicePage = () => {
  const {id} = useParams();
  const [invoiceData, setInvoiceData] = useState<any>(null);

  useEffect(() => {
    const fetchBuildData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/builds/" + id);
        const data = await response.json();

        // Format the data for InvoicePDF component
        const formattedData = {
          date: new Date(data.createdAt).toLocaleDateString(),
          items: [
            { description: `Motherboard: ${data.motherboard}`, quantity: 1, price: data.motherboardPrice, total: data.motherboardPrice },
            { description: `Processor: ${data.processor}`, quantity: 1, price: data.processorPrice, total: data.processorPrice },
            { description: `RAM: ${data.ram}`, quantity: 1, price: data.ramPrice, total: data.ramPrice },
            { description: `GPU: ${data.gpu}`, quantity: 1, price: data.gpuPrice, total: data.gpuPrice },
            { description: `Storage: ${data.storage}`, quantity: 1, price: data.storagePrice, total: data.storagePrice },
            { description: `PSU: ${data.psu}`, quantity: 1, price: data.psuPrice, total: data.psuPrice },
            { description: `Casing: ${data.casing}`, quantity: 1, price: data.casingPrice, total: data.casingPrice },
          ],
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
    <div>
      <h1>Invoice</h1>

      {invoiceData ? (
        <>
          {/* PDF Preview */}
          <PDFViewer style={{ width: "100%", height: "500px" }}>
            <InvoicePDF invoiceData={invoiceData} />
          </PDFViewer>

          {/* PDF Download */}
          <PDFDownloadLink document={<InvoicePDF invoiceData={invoiceData} />} fileName="invoice.pdf">
          </PDFDownloadLink>
        </>
      ) : (
        <p>Loading invoice...</p>
      )}
    </div>
  );
};

export default InvoicePage;
