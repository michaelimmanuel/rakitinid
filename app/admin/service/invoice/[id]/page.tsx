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
        const response = await fetch("/api/service/" + id);
        const data = await response.json();

        // response example

        // {"id":3,"name":[{"name":"test","price":"100000"},{"name":"rakit","price":"200000"}],"price":300000,"createdAt":"2025-01-03T05:45:25.953Z","updatedAt":"2025-01-03T05:45:25.953Z"}

        // Format the data for InvoicePDF component
        const formattedData = {
          date: new Date(data.createdAt).toLocaleDateString(),
          items: 
          data.name.map((item: any) => ({
            service: item.name,
            price: item.price.toLocaleString(),
          })),
          total: data.price.toLocaleString(),
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
            <InvoicePDF invoiceData={invoiceData} id="service"/>
          </PDFViewer>

          {/* PDF Download */}
          <PDFDownloadLink document={<InvoicePDF invoiceData={invoiceData} id="service"  />} fileName="invoice.pdf">
          </PDFDownloadLink>
        </>
      ) : (
        <p>Loading invoice...</p>
      )}
    </div>
  );
};

export default InvoicePage;
